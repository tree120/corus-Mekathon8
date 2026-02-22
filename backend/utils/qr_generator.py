import qrcode
import os

def generate_qr(product_id):

    url = f"http://127.0.0.1:8000/product/{product_id}"

    folder = "qr_codes"
    os.makedirs(folder, exist_ok=True)

    file_name = f"product_{product_id}.png"
    file_path = os.path.join(folder, file_name)

    qr = qrcode.make(url)
    qr.save(file_path)

    return f"/qr_codes/{file_name}"

# import qrcode
# import os

# def generate_qr(product_id):

#     # URL that QR will open
#     #url = f"http://localhost:8000/product/{product_id}"
#     url = f"http://127.0.0.1:8000/product/{product_id}"
#     folder = "qr_codes"
#     os.makedirs(folder, exist_ok=True)

#     file_path = f"{folder}/product_{product_id}.png"

#     qr = qrcode.make(url)
#     qr.save(file_path)

#     return file_path
