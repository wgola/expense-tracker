# 🗞️ Receipt analyzer 💰

## 📔 Description

`Receipt-analyzer` is a stand-alone service created with [`Python`](https://www.python.org) and [
`Flask`](https://flask.palletsprojects.com/en/stable/) in a Microservices structure serving receipt analyzing purposes
for the main application.

The analysis of receipt works as follows:

- receipt image is send via `POST /api/analyze-receipt` endpoint:

```python
from flask import Flask

app = Flask(__name__)


@app.route('/api/analyze-receipt', methods=['POST'])
def handle_request()
```

- image is preprocessed with the [`Pillow`](https://pypi.org/project/pillow/) library:

  - image is converted to grayscale
  - image is filtered with a Median filter
  - image is resized to a bigger size

  ```python
  from PIL import Image, ImageOps, ImageFilter


  def preprocess_image(file):
      image = Image.open(file)

      image = ImageOps.grayscale(image)

      image = image.filter(ImageFilter.MedianFilter)

      image = image.resize((1000, image.height * 1000 // image.width))

      return image
  ```

- image is then processed with the [`pytesseract`](https://pypi.org/project/pytesseract/) library to extract text from
  the image:

```python
import pytesseract

custom_oem_psm_config = r'--oem 3 --psm 6'

text = pytesseract.image_to_string(preprocess_image(file), lang='pol+eng', config=custom_oem_psm_config)

```

- extracted text is then processed with a `large-language-model` to extract the cost of the receipt:

```python
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

```

- extracted cost is then returned:

```python
total_amount = extract_total_amount(text)

return jsonify({'totalAmount': total_amount}), 200
```

The `LLM` is run using [`Ollama`](https://ollama.com). Model used during development was [
`llama3.2`](https://ollama.com/library/llama3.2).
