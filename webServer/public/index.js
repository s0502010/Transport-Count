
//preview file
const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");
// convert file to a base64 url

function download(fileUrl, fileName) {
    var a = document.createElement("a");
    a.href = fileUrl;
    a.setAttribute("download", fileName);
    a.click();
  }

inpFile.addEventListener("change", async function (event) {

    const file = this.files[0];
    if (file.name.includes('.jpg')) {

        let file = event.target.files[0]

        const photo = document.getElementById("imagePreview")
        photo.innerHTML =
            `  <img id="imgBox" src="" alt="Image Preview" class="image-preview__image" style="height: 100%; weight: auto;">
        `
        let reader = new FileReader();

        reader.addEventListener("load", function () {
            document.getElementById("imgBox").src = reader.result;
            document.querySelector(".image-preview__image").style.display = "block"
            //document.getElementById("imgBox").toggle("mystyle");
        }, false);
        previewDefaultText.style.display = "none";
        document.getElementById("submit").style.visibility = "visible"

        if (file) {
            reader.readAsDataURL(file);
        }


    } else if (file.name.includes('.mp4')) {

        let blobURL = URL.createObjectURL(event.target.files[0]);
        const video = document.getElementById("imagePreview")
        video.innerHTML =
            `<video width="300" height="240" controls id="videoBox">
        <source src="" type="video/mp4" class="image-preview__image">
        Your browser does not support the video tag.
      </video>
      `;
        document.getElementById("videoBox").src = blobURL;

        console.log(event.target.files[0])
        console.log("a" ,blobURL)
        document.getElementById("submit").style.visibility = "visible"

    }
    else {
        document.getElementById("imagePreview").innerHTML = `<div><i class="fas fa-exclamation-circle"></i></div><br><div><p>please select a MP4 or JPG file<p></div>`
        document.getElementById("submit").style.visibility = "hidden"
    }

})

const loading = document.querySelector(".lds-ripple")
// document.querySelector("#submit").addEventListener("click", () => showLoading())
function showLoading() {
    console.log("hi")
    loading.style.display = "inline-block";
    document.getElementById("inpFile").style.visibility = "hidden"
}
function finishLoading(){
    console.log("bye")
    loading.style.visibility="hidden";
    document.getElementById("inpFile").style.visibility="visible"
}
document.querySelector("#clear").addEventListener("click", () => clear())
function clear() {
    console.log("hi")
    location.reload();;
}
// submit.append("photo", form.files[0])
// console.log(form.files[0])
// let formData = {
//   photo:form.files[0]
// }
document.querySelector(".input-container").addEventListener("submit", async (event) => {
    showLoading()
    event.preventDefault();

    let form = event.target.photo
    // console.log(form.files[0])
    const formData = new FormData();
    formData.append("photo", form.files[0]);
    console.log(formData)

    const res = await fetch("/uploadPhoto", {
        method: "POST",
        //   headers:{
        //     "content-type":"application/json"
        //   },
        body: formData
    });

    const result = await res.json(); //result = {value: inputText} 
    finishLoading()
    console.log(result.message)
    // inpFile.addEventListener("change", async function (event) {
    async function show() {
        console.log('result.message :', result.message.data);

        if (result.message.data.includes('.jpeg' || '.jpg')) {

            let fileName = "yoloImages/" + result.message.data

            const photo = document.getElementById("output-preview")
            photo.innerHTML =
                `  <img id="imgBox" src="${fileName}" alt="Image Preview" class="image-preview__image" style="height: 100%; weight: auto;">
            `
            let reader = new FileReader();
    
            reader.addEventListener("load", function () {
                document.getElementById("imgBox").src = reader.result;
            }, false);
            
            // if (file) {
            //     reader.readAsDataURL(file);
            // }

            document.querySelector(".downloadButtom").innerHTML =`<a href="${fileName}" download="${result.message}">
            <button type="button">Download</button>
            </a>`
    
    
        } else if (result.message.data.includes('.avi')) {
    
            // let blobURL = URL.createObjectURL(result);
            
            videoName = "yoloVideo/" + result.message.data

            const video = document.getElementById("output-preview")

            video.innerHTML =
                `<video width="300" height="240" controls id="videoShow">
            <source src="${videoName}" type="video/avi" class="image-preview__image">
            Your browser does not support the video tag.
          </video>
          `;
            // document.getElementById("videoBox").src = blobURL;
        
            document.querySelector(".downloadButtom").innerHTML =`<a href="${videoName}" download="${result.message}">
            <button type="button">Download</button>
            </a>`
    
        }
        else {
            document.getElementById("imagePreview").innerHTML = `<div><i class="fas fa-exclamation-circle"></i></div><br><div><p>please select a MP4 or JPG file<p></div>`
        }

    }

    show()
    // })

})



