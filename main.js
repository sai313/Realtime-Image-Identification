function setup() {
    canvas = createCanvas(300,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifer = ml5.imageClassifier("MobileNet",modelLoaded);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function draw() {
    image(video,0,0,300,300);
    classifer.classify(video, gotResult);
}

var previous_results = "";

function gotResult(error,result) {
    if (error) {
        console.error(error);
    } else if ((result[0].confidence > 0.5) && (previous_results != result[0].label)) {
        console.log(result);
        previous_results = result[0].label;
        var synth = window.speechSynthesis;
        speak_data = "Object detected is"+result[0].label;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        document.getElementById("result_name").innerHTML = result[0].label;
        document.getElementById("result_accuracy").innerHTML = result[0].confidence.toFixed(3);
    }
}