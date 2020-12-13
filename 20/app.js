const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// start recognition and game
recognition.start();

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

function writeMessage(msg) {
  msgEl.innerHTML = `        
    <div>You said:</div>
    <span class="box">${msg}</span>`;
}

function checkNumber(msg) {
  const num = +msg;

  // check if valid
  if (Number.isNaN(num)) {
    msgEl.innerHTML = `    <div>This is not a valid number</div>`;
    // return to prevent it proceed with below
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number! <br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += '<div>GO LOWER</div>';
  } else {
    msgEl.innerHTML += '<div>GO HIGHER</div>';
  }
}

// speak result
recognition.addEventListener("result", onSpeak);

// end sr service

recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id == "play-again") {
    window.location.reload();
  }
});
