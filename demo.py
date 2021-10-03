import os
from flask import Flask, render_template, request
import jwt

app = Flask(__name__)


EMBED_ID = "13f87078-7bee-4628-9576-b95729b5618b"
PRIVATE_KEY = "XB9qfKRsf5xjWnid8oRenkma9QtZP4S76eWCyVKFjHY4eDsBW9j7suQ3ccU00eON"

@app.get("/")
def home():
    try:
        data = {
            "token": jwt.encode(
                {
                    "embed": EMBED_ID,
                    "sub": "your user",
                },
                PRIVATE_KEY,
                algorithm="HS256",
            )
        }
        return render_template("home.html", data=data)
    except Exception as e:
        return str(e)


@app.post("/process_json")
def process_json():
    app.logger.info("howdy")
    for record in request.get_json():
        message = (
            f"{record['company_id']=}, "
            f"{record['employee_id']=}, "
            f"{record['first_name']=}, "
            f"{record['last_name']=}, "
            f"{record['employee_email']=}, "
            "sent to SNS topic"
        )
        app.logger.info(message)
    return "done"


