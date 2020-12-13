const container = document.querySelector(".container");
let seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

function updateSelectedCount() {
  let ticketPrice = +movieSelect.value;
  let selecedSeats = document.querySelectorAll(".row .seat.selected");
  let seatCount = selecedSeats.length;
  let totalPrice = ticketPrice * seatCount;
  count.innerText = seatCount;
  total.innerText = totalPrice;

  // for each array of array
  seats = Array.from(seats);
  selecedSeats = Array.from(selecedSeats);

  // **************************************{important concept}***********************************************
  // for each then cannot assign to const de;
  // selecedSeats.forEach((seat) => {
  //   console.log(seats.indexOf(seat));
  // });
  // map return in an array
  let totalclickedSeatIndex = selecedSeats.map((seat) => {
    return seats.indexOf(seat);
  });

  UpdatetoLS('selected seats',totalclickedSeatIndex);
}

function SelectedSeat(e) {
  if (
    e.target.classList.contains("seat") ||
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
}


function EditSelection(e) {
  ticketPrice = +e.target.value;
  updateSelectedCount();
  setMovieData(e.target.selectedIndex, e.target.value);
}

function setMovieData(index,value){
  localStorage.setItem('Movieindex', JSON.stringify(index));
  localStorage.setItem('MoviePrice', JSON.stringify(value));

}


function UpdatetoLS(input,value) {
  localStorage.setItem(input, JSON.stringify(value));
}

function loadDOM(){

  const selectedSeats =JSON.parse(localStorage.getItem('selected seats'));
  console.log(selectedSeats);
  if(selectedSeats !==null && selectedSeats.length>0){

      seats.forEach(function(seat,index){
          if (selectedSeats.indexOf(index)>-1) {
              seat.classList.add('selected');
          }
      });

  }

  const selectedMovieIndex = localStorage.getItem('Movieindex');

  if(selectedMovieIndex !== null){
      // set the selectedIndex
      movieSelect.selectedIndex = selectedMovieIndex
  }

  
  updateSelectedCount();
}


initDOM();
container.addEventListener("click", SelectedSeat);

movieSelect.addEventListener("change", EditSelection);


function initDOM(){
    loadDOM();
}