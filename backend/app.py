from flask import Flask, request, jsonify
from model.inference import predict_image
from flask_cors import CORS

app=Flask(__name__)

CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({"Error":"No image uploaded"}),400
    image=request.files['image']
    result=predict_image(image)
    return jsonify(result)

if __name__=='__main__':
    app.run(debug=True)