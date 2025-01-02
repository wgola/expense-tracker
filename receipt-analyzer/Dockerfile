FROM python:3.12-alpine3.21

WORKDIR /app

RUN apk add --no-cache tesseract-ocr-data-eng=5.5.0-r0 tesseract-ocr-data-pol=5.5.0-r0 tesseract-ocr=5.5.0-r0

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "-b", "0.0.0.0:5000", "main:app"]

