// part 1- word match and score
// part 2-  timer
// part3- difficulty setting    


const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
let difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];


// init word
let randomWord;

// init score
let score= 0;

// init time
let time=10;

// load difficulty
let difficulty = localStorage.getItem('difficulty') !==null ? localStorage.getItem('difficulty') :  'medium';

// set difficulty select value;
difficultySelect.value = difficulty;



// generate word from array
function getRandomWorld(){
    return words[Math.floor(Math.random()*words.length)];

}

// start timer- setinterval - run updateTime every 1s; it will auto run, even not fire it
let timeInterval= setInterval(updateTime,1000);

// update time
function updateTime(){
    time--;
    timeEl.innerText = time +"s";


    if (time===0){
        // default function
        clearInterval(timeInterval);

        gameOver();
    }
}

// game over , show end screen
function gameOver(){
    endgameEl.innerHTML=`<h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button> 
    `;
    endgameEl.style.display= 'flex';

}

function addtoDOM(){
    randomWord= getRandomWorld();
    word.innerText=randomWord;
} 

function updateScore(){
    score++;
    scoreEl.innerHTML=score;
}


function timeDifficulty(){
    if (difficulty =="hard"){
        time+=2;
    } else if (difficulty === "medium"){
        time+=3;
    } else {
        time+=5;
    }
}



addtoDOM();

// focus on start
text.focus();

text.addEventListener('input' ,e=>{
    const insetedText= e.target.value;
    
    if(insetedText===randomWord){
        addtoDOM();
        updateScore();
        // clear 
        e.target.value="";

        timeDifficulty()


        // updateTime();   no need updateTime

    }
})


// settings btn click
settingsBtn.addEventListener('click', ()=>{
    settings.classList.toggle('hide');
})


// settings select
settingsForm.addEventListener('change', e=>{

    // can either use value or selectedIndex
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);


})
