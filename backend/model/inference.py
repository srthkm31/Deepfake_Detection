import torch
import torch.nn as nn
import torchvision
import timm
from PIL import Image
from torchvision.transforms import v2

test_transform=v2.Compose([
    v2.Resize((299, 299)),
    v2.ToTensor(),
    v2.Normalize(
        mean=[0.5, 0.5, 0.5],
        std=[0.5, 0.5, 0.5]
    )
])

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model=timm.create_model('xception')

model.fc=nn.Sequential(
    nn.Linear(2048, 512),
    nn.ReLU(),
    nn.Dropout(p=0.4),

    nn.Linear(512, 1),
)

model.load_state_dict(torch.load("/xception_deepfake_improved2.pth", map_location=device, weights_only=True))

model.to(device)
model.eval()

def predict_image(image):
    input = Image.open(image).convert('RGB')

    input = test_transform(input)

    input = input.unsqueeze(0)

    input = input.to(device)

    with torch.no_grad():

        out = model(input)

        prob = torch.sigmoid(out).item()

        print("Raw Model Output:", out.item())
        print("Probability:", prob)

    if prob > 0.5:

        prediction = "Real"

        confidence = prob * 100

    else:

        prediction = "Fake"

        confidence = (1 - prob) * 100

    print("Prediction:", prediction)
    print("Confidence:", confidence)

    return {
        "prediction": prediction,
        "confidence": round(confidence, 2)
    }
