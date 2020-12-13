const video = document.getElementById("video");
const play = document.getElementById("play");
const Stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestrap");

// EVENT LISTENERS -more listener for video

video.addEventListener("click", toggleVideoStatus);

video.addEventListener("pause", updatePLayIcon);

video.addEventListener("play", updatePLayIcon);
// video method
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

Stop.addEventListener("click", stopVideo);
// video method
progress.addEventListener("change", setVideoProgress);

// **************************************{FUNCTION OF LISTNERES}***********************************************

// play and pause video
function toggleVideoStatus() {
  // default property of video
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// update play/pause icon
function updatePLayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class = "fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class = "fa fa-pause fa-2x"></i>';
  }
}

// update progress and timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }


  timestamp.innerHTML = `${mins}:${secs}`;
}

// stop video
function stopVideo() {
  // set current time at begineering and pause
  video.currentTime = 0;
  video.pause();
  return true;
}

// set video and time to progress
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}
