const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const countdown = document.getElementById('countdown');

const loading = document.getElementById('loading');
const year= document.getElementById('year');


const currentYear = new Date().getFullYear();

const newYearTime = new Date(`January 01 ${currentYear +1} 00:00:00`);

// set background year
year.innerText=currentYear +1;


// update countdown time
function updateCountDown(){
    const currenTime = new Date();
    const diff = newYearTime- currenTime;

    // conver to days /1000= to second from ms
    const d = Math.floor(diff/1000/60/60/24);
    const h = Math.floor(diff/1000/60/60) %24;
    const m = Math.floor(diff/1000/60) %60;
    const s = Math.floor(diff/1000) %60 ;


    days.innerHTML=d;
  hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML=m <10 ? "0"+m : m;
    seconds.innerHTML=s <10 ? '0'+s : s;




}

setTimeout(()=>{
    loading.remove();
    countdown.style.display = "flex";

},1000);


// run every second
setInterval(updateCountDown,1000);

