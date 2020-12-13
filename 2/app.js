const container= document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count =document.getElementById('count');
const total=document.getElementById('total');
const movieSelect = document.getElementById('movie');

// part 4
populateUI();


// change to int
let ticketPrice =  + movieSelect.value;



// **************************************{`Event listener function}***********************************************
// update total and count and show -part 2
function updateSelectedCount(){
    // it is nodelist, only have length and [number] method like array
const selectedSeats = document.querySelectorAll('.row .seat.selected');
const selectedSeatsCount = selectedSeats.length;

// part-3- select all seat / convert nodelist to array by [...] ; another method is Array.from()
const seatIndex = [...selectedSeats].map(function(seat1){
    // return an index
    return [...seats].indexOf(seat1);
});

// save seatindex to LS
updateLocalStorage('selected seats',seatIndex);

count.innerText= selectedSeatsCount;
total.innerText= selectedSeatsCount*ticketPrice;
}

// part3 -save info of movies
const setMovieData= function(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);


}

// part-4
function populateUI(){
    const selectedSeats =JSON.parse(localStorage.getItem('selected seats'));
    console.log(selectedSeats);
    // add seat after loading
    if(selectedSeats !==null && selectedSeats.length>0){

        // nodelist got for each function
        seats.forEach(function(seat,index){
            if (selectedSeats.indexOf(index)>-1) {
                seat.classList.add('selected');
            }
        });

    }


    // set index at which movie after loading
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        // set the selectedIndex
        movieSelect.selectedIndex = selectedMovieIndex
    }
}

// update LS
function updateLocalStorage(input,value){
localStorage.setItem(input,JSON.stringify(value));

};


// **************************************{Seat Click Event}***********************************************
// PART 1
container.addEventListener('click',function(e){
    
    if (e.target.classList.contains('seat') &&  !e.target.classList.contains('occupied')) {
        // turn on and off = toggle the class 
       e.target.classList.toggle('selected');
       updateSelectedCount();
    }

    e.preventDefault();
})

movieSelect.addEventListener('change',e=>{
    ticketPrice= +e.target.value;
    // part 3- selected index and value in option is one of method default 
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// part4
// initial count and update

updateSelectedCount();
