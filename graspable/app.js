// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
var track = null;

async function fetchEquation(stream_data) {
    let response = await fetch("https://api.mathpix.com/v3/latex", {
        method: "POST", 
        headers: {

        },
        url: "https://api.mathpix.com/v3/latex",
        body: JSON.stringify({
             "src"  : stream_data.src,
            "formats": ["latex_normal"]
          })
    });
    let data = await response.text();
    console.log(data);
    console.log(data.latex_normal);
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
    fetchEquation(cameraOutput)
    .then(function(result) {
        latex = JSON.parse(result).latex_normal
        window.open("https://math.new?eq=".concat(latex), '_blank');

        // track.stop();
    });
    cameraOutput.classList.add("taken");

};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);