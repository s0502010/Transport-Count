from fileinput import filename
from sanic import Sanic
from sanic.response import json
import torch
import shutil
import os
import yolov5.detect

app = Sanic("Transport_Count")
# model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt', force_reload=True) 
# class_names = ['car', 'double-decker-bus', 'bus', 'truck', 'motorbike']

# img = 'py_server/IMG_0676.jpg'

# yolov5.detect.run()

@app.post("/")
def handler(request):

    img = request.json
    print(img['files'])
    print('type:', type(img['files']))
    
    if 'mp4' in img['files']:
        folder_path = ("./yolov5/runs")
        if os.path.exists(folder_path):
            shutil.rmtree(folder_path)

        yolov5.detect.run(source = img['files'])

        fileName = os.listdir('./yolov5/runs/detect/exp')
        # for i in fileName:
        return json({"data": fileName[0]})       
    else:
        folder_path = ("./yolov5/runs")
        if os.path.exists(folder_path):
            shutil.rmtree(folder_path)

        # results = model(img['files'])
        # results.print()  
        # results.save()

        yolov5.detect.run(source = img['files'])

        fileName = os.listdir('./yolov5/runs/detect/exp')
        print('fileName: ', fileName)
        # for i in fileName:
        return json({"data": fileName[0]})
        
    # print('not working')
    # print(img['files'])
    #
    # print(results.pandas().xyxy[0])
    return json({"message":"Hello, world."})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)

