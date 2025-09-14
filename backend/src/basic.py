import panel as pn
from huggingface_hub import AsyncInferenceClient
import os
from dotenv import load_dotenv

load_dotenv()
pn.extension()


async def callback(contents: str, user: str, instance: pn.chat.ChatInterface):

    # memory is a list of messages
    messages = instance.serialize()
    prompt = '\n'.join([m['content'] for m in messages if m['role'] == 'user'])
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
    GEMINI_API_URL = f'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={GEMINI_API_KEY}'
    payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(GEMINI_API_URL, json=payload, headers=headers)
    message = ""
    if response.ok:
        data = response.json()
        part = data.get('candidates', [{}])[0].get('content', {}).get('parts', [{}])[0].get('text', None)
        if part:
            message += part
            yield message
    else:
        yield f"Gemini API error: {response.status_code}"


aclient = AsyncInferenceClient(token=os.getenv('HF_API_KEY'))

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
