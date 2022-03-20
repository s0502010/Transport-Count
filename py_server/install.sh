set -e

cd yolov5
pip install -r requirements.txt

cd ..
pip install -r requirements.txt

sudo apt install xvfb
