// part 1- load, play & pause song
// part2-next and progress

const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// song titles
const songs = ["hey", "summer", "ukulele"];

// keep track of song

let songIndex = 1;

// initally load song details into DOM

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// play song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove(`fa-play`);
    playBtn.querySelector('i.fas').classList.add(`fa-pause`);


    // default method
    audio.play();

}

function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add(`fa-play`);
    playBtn.querySelector('i.fas').classList.remove(`fa-pause`);


    // default method
    audio.pause();

}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex= songs.length-1
    };

    loadSong(songs[songIndex]);
    
    playSong();
}

function nextSong(){
    songIndex++;
    if(songIndex > (songs.length-1)){
        songIndex= 0
    };

    loadSong(songs[songIndex]);
    
    playSong();
}

// time update
function updateProgress(e){
    const {duration, currentTime}= e.srcElement;
    const progressPercent= (currentTime/duration)*100;

    // let it move in width
    progress.style.width=`${progressPercent}%`;
}

// change time
function setProgress(e){

    // total width of bar
    const width= this.clientWidth;

    // position we clicked
    const clickx= e.offsetX;

    const duration= audio.duration;

    audio.currentTime= (clickx/width)*duration;
}


loadSong(songs[songIndex]);

// event listener
playBtn.addEventListener('click',()=>{
    const isPlaying= musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong()
    } else{
        playSong()
    }
})


// change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// deafult= timeupdate of audio
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar

progressContainer.addEventListener('click',setProgress);


// audio method =ends

audio.addEventListener('end', nextSong);