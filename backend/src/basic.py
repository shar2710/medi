
import panel as pn
import requests
import os
from dotenv import load_dotenv

load_dotenv()
pn.extension()


async def callback(contents: str, user: str, instance: pn.chat.ChatInterface):
    messages = instance.serialize()
    prompt = '\n'.join([m['content'] for m in messages if m['role'] == 'user'])
    gemini_api_key = os.getenv('GEMINI_API_KEY')
    gemini_model = 'gemini-1.5-flash'
    gemini_api_url = f'https://generativelanguage.googleapis.com/v1/models/{gemini_model}:generateContent?key={gemini_api_key}'
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(gemini_api_url, json=payload, headers=headers)
    message = ""
    if response.ok:
        data = response.json()
        part = None
        if "candidates" in data and data["candidates"]:
            candidate = data["candidates"][0]
            if "content" in candidate and "parts" in candidate["content"] and candidate["content"]["parts"]:
                part = candidate["content"]["parts"][0].get("text", None)
        if part:
            message += part
            yield message
        else:
            yield "No response from Gemini API."
    else:
        error_msg = response.text
        yield f"Gemini API error: {response.status_code} - {error_msg}"



chat_interface = pn.chat.ChatInterface(
    callback=callback,
    callback_user="MediBot Basic",
    help_text="Ask a query to get help from MediBot Basic",
)
template = pn.template.FastListTemplate(
    title="Basic",
    header_background="#212121",
    main=[chat_interface],
    site="MediBot",
    site_url="/basic",
)
template.servable()
