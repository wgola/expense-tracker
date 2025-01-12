import os
from ollama import Client


def extract_total_amount(text):
    ollama_url = os.environ.get('OLLAMA_API_BASE_URL', 'http://localhost:11434')
    client = Client(host=ollama_url)

    model = os.environ.get('OLLAMA_MODEL', 'llama3.2')
    response = client.chat(model=model, messages=[
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
