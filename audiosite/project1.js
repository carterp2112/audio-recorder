document.addEventListener('DOMContentLoaded', init, false);

function init(){
    let chunks = [];
    let mediaRecorder; // define it here to access in both recordAudio and stopAudio
    let audioURL; // define it here to access in both stopAudio and playAudio

    function recordAudio () {
      alert("Recording Started.");
      navigator.mediaDevices.getUserMedia({audio: true}).then((stream) => {
          mediaRecorder = new MediaRecorder(stream);

          // Set up event listeners after initializing the MediaRecorder
          mediaRecorder.ondataavailable = (e) => {
              chunks.push(e.data);
          };

          mediaRecorder.start();
      });
    }

    function stopAudio() {
        mediaRecorder.stop();

        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        audioURL = window.URL.createObjectURL(blob); // assign value to the outer scoped audioURL
        const audio = new Audio(audioURL);
        audio.play();
    }

    function playAudio() {
        alert("Playing audio.");
        const audio = new Audio(audioURL);
        audio.play();
    }

    let button = document.getElementById('record-button');
    button.addEventListener('click', recordAudio, true);

    let button1 = document.getElementById('stop-button');
    button1.addEventListener('click', stopAudio, true);

    let button2 = document.getElementById('play-button');
    button2.addEventListener('click', playAudio, true);
};
