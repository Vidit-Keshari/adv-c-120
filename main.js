function setup() {
  canvas = createCanvas(250, 250);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classfier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function modelLoaded() {
  console.log("Modal is loaded successfully!");
}

function draw() {
  image(video, 0, 0, 300, 300);
  classfier.classify(video, gotResult);
}

function developer() {
  window.alert("Developed By- Vidit Keshari");
}
var previous_result = '';

function gotResult(error, results) {
  if(error) {
    console.error(error);
  } else {
    if((results[0].confidence > 0.5) && (previous_result != results[0].label)) {
      console.log(results);
      previous_result = results[0].label;
      var synth = window.speechSynthesis;
      speak_data = 'Object detected is - ' + results[0].label;
      var utterThis = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML = results[0].label;
      document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}