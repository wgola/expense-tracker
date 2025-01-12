# 🗞️ Receipt analyzer 💰

## 📔 Description

Stand-alone service created in a Microservices structure serving analyzing purposes for the main application

Consists of three main pillars:

- image processing using `Pillow` to adjust the receipt to the upcoming stages
- image to text extraction using `pytesseract`
- **AI-powered** expense cost analysis using a `large-language-model`

## 💻 Running the app locally

The easiest way to run the app locally is to use Docker You can run the app using the provided Dockerfile by doing:

- Build the Docker image:

```shell
`docker build -t your_image_name .`
```

- Run the Docker container:

```shell
docker run -d -p 5000:5000 your_image_name
```
