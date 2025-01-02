from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.preprocess_image import preprocess_image
from utils.extract_total_amount import extract_total_amount
import pytesseract

app = Flask(__name__)
CORS(app)


@app.route('/api/analyze-receipt', methods=['POST'])
def handle_request():
    try:
        file = request.files['files']

        custom_oem_psm_config = r'--oem 3 --psm 6'

        text = pytesseract.image_to_string(preprocess_image(file), lang='pol+eng', config=custom_oem_psm_config)

        total_amount = extract_total_amount(text)

        return jsonify({'totalAmount': total_amount}), 200
    except:
        return jsonify({'totalAmount': None}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
