import os
import tempfile
import panel as pn
import requests
from dotenv import load_dotenv

load_dotenv()
pn.extension()


@pn.cache
def gemini_llm(prompt: str) -> str:
    gemini_api_key = os.getenv('GEMINI_API_KEY')
    gemini_model = 'gemini-1.5-flash'
    gemini_api_url = f'https://generativelanguage.googleapis.com/v1/models/{gemini_model}:generateContent?key={gemini_api_key}'
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(gemini_api_url, json=payload, headers=headers)
    if response.ok:
        data = response.json()
        part = None
        if "candidates" in data and data["candidates"]:
            candidate = data["candidates"][0]
            if "content" in candidate and "parts" in candidate["content"] and candidate["content"]["parts"]:
                part = candidate["content"]["parts"][0].get("text", None)
        if part:
            return part
        else:
            return "No response from Gemini API."
    else:
        return f"Gemini API error: {response.status_code} - {response.text}"


def respond(contents, user, chat_interface):
    chat_input.placeholder = "Ask questions here!"
    if chat_interface.active == 0:
        chat_interface.active = 1
        yield {"user": "MediBot Report Assisstat", "value": "What do you want to ask"}
        contents.seek(0)
        pn.state.cache["pdf"] = contents.read()
        return

    # For simplicity, just send the raw PDF text to Gemini
    pdf_text = str(contents)
    response = gemini_llm(pdf_text)
    answers = pn.Accordion(("Response", response))
    answers.active = [0]
    yield {"user": "MediBot Report Assisstant", "value": answers}


## Removed sidebar widgets and options not needed for Gemini logic


# Modern Panel UI
pdf_input = pn.widgets.FileInput(accept=".pdf", value="", height=60, width=350)
chat_input = pn.chat.ChatAreaInput(placeholder="Type your question about the report...", width=350)
chat_interface = pn.chat.ChatInterface(
    help_text="Upload your medical report (PDF) and ask any question about it.",
    callback=respond,
    sizing_mode="stretch_width",
    widgets=[pdf_input, chat_input],
    callback_exception="verbose",
    avatar="https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
    show_history=True,
    show_user_name=False,
    show_timestamp=True,
)
chat_interface.active = 0

template = pn.template.MaterialTemplate(
    title="MediBot Report Assistant",
    main=[pn.Column(
        pn.pane.Markdown("## 📄 Report Assistant\nUpload your medical report and ask questions about it!", style={"color": "#4a69bd", "font-size": "1.5rem", "margin-bottom": "1rem"}),
        chat_interface,
        width=400,
        margin=(30, 0, 0, 0)
    )],
    accent="#4a69bd",
    header_background="#f0f4ff",
    theme_toggle=True,
    site="MediBot",
    site_url="/report_assisstant",
)
template.servable()
