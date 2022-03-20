import torch

# Model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt', force_reload=True) 

# Image
img = 'IMG_0769.jpg'

# Inference
results = model(img)
results.print()  
results.save()  # or .show()

print(results.pandas().xyxy[0])

