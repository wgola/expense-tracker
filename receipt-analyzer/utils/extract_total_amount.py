import os
import logging

from ollama import Client

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def extract_total_amount(text: str) -> None | float:
    ollama_url = os.environ.get('OLLAMA_API_BASE_URL', 'http://localhost:11434')
    client = Client(host=ollama_url)

    response = client.chat(model='llama3.2', messages=[
        {
            'role': 'system',
            'content': 'You are an assistant that extracts information from text. You are given a receipt text from polish shop and you have to extract total amount of money paid.'
        },
        {
            'role': 'user',
            'content': f"Here is the receipt text: {text}. Return only amount as number fixed to two decimal places without any additional words."
        },
    ])

    try:
        return float(response['message']['content'].replace(',', '.'))
    except ValueError:
        return None
