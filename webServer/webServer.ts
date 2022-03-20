import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fetch from "node-fetch";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));
app.use('/yoloImages', express.static("../py_server/yolov5/runs/detect/exp"));
app.use('/yoloVideo', express.static("../py_server/yolov5/runs/detect/exp"))

let count = 0
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    count ++
    let time = Date.now()
    let ext = file.mimetype.split("/").pop()
    let filename = `${file.fieldname}-${time}-${count}.${ext}`
    cb(null, filename);
  },
});
const upload = multer({ storage });

app.post(
  "/uploadPhoto",
  upload.single("photo"),
  async (req: Request, res: Response) => {
    // console.log(req.file?.filename)
    // res.json({success:true})
    try {
      let file = req.file?.filename || "";
      let pathToImg = "../webServer/uploads";

      let paths = path.join(pathToImg, file);

      const result = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ files: paths }),
      });
      const message = await result.json();
      try {
        console.log("result from python server:", message);
        res.json({ message });

      } catch (e) {
        console.error("Cannot resend the photo or video")
      }
    } catch (e) {
      console.error("Cannot upload the photo or video")
    }
  }
);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
