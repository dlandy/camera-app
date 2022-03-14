// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

async function fetchEquation(stream_data) {
    let response = await fetch("https://api.mathpix.com/v3/latex", {
        method: "POST", 
        headers: {
            "content-type": "application/json",
            app_id: "dhlandy_gmail_com_e9bd5f_8329a6", 
            app_key: "7af70617e1af192f3d2261c5eb25fb7470a6ea9159332247c5d0210c0f8c746a"
        },
        url: "https://api.mathpix.com/v3/latex",
        body: JSON.stringify({
            "file": stream_data,
            "formats": ["latex_normal"]
          })
    });
    let data = await response.text();
    console.log(data);
    return data;
}


// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}


// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    console.log("I'm here")
    var result = fetchEquation(cameraOutput.src)
    console.log(result)
    console.log(cameraOutput.src)
    console.log(cameraOutput)

    cameraOutput.classList.add("taken");
    // track.stop();
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);