/*
part 1- data display
part2- api to get voice ption 
part3- speech button
part4- change voice and custom box
*/

const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

//   create speech boxes
function createBox(item) {
  const box = document.createElement("div");

  // destructing
  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;

  //   to do to speak for each div
  box.addEventListener('click',()=>{
    setTextMessage(text);
    speakText();

    // add an active effect and remove it
    box.classList.add('active');
    setTimeout(()=> box.classList.remove('active'),800 )
  })



  main.appendChild(box);
}

// /store voice

let voice= [];

function getVoices(){
  voices= speechSynthesis.getVoices();

  console.log(voices);
  voices.forEach(voice=>{
    const option =document.createElement('option');

    option.value =  voice.name;
    option.innerText= `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  })
}

// set voice to other when changed
function setVoice(e){
  message.voice=voices.find(voice=>voice.name === e.target.value);
}

function setTextMessage(text){
  message.text = text;
}

function speakText(){
  speechSynthesis.speak(message);
}

// voice changed- update list

speechSynthesis.addEventListener('voiceschanged', getVoices);

// init speech synthesis
const message= new SpeechSynthesisUtterance();


// toggle text box
toggleBtn.addEventListener('click',()=> document.getElementById('text-box').classList.toggle('show'));

// close btn
closeBtn.addEventListener('click',()=> document.getElementById('text-box').classList.remove('show'));

voicesSelect.addEventListener('change',setVoice);

// read text button
readBtn.addEventListener('click', ()=>{
  setTextMessage(textArea.value);
  speakText();
})


getVoices();