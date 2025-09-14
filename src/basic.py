import panel as pn
from openai import AsyncOpenAI
import os
from dotenv import load_dotenv

load_dotenv()
pn.extension()


async def callback(contents: str, user: str, instance: pn.chat.ChatInterface):

    # memory is a list of messages
    messages = instance.serialize()

    response = await aclient.chat.completions.create(
        model="gpt-4-0125-preview",
        messages=messages,
        stream=True,
    )

    message = ""
    async for chunk in response:
        part = chunk.choices[0].delta.content
        if part is not None:
            message += part
            yield message


aclient = AsyncOpenAI(api_key = os.getenv('OPENAI_API_KEY'))

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
