from PIL import Image, ImageOps, ImageFilter


def preprocess_image(file):
    image = Image.open(file)

    image = ImageOps.grayscale(image)

    image = image.filter(ImageFilter.MedianFilter)

    image = image.resize((1000, image.height * 1000 // image.width))

    return image
