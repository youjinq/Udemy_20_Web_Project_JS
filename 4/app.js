// **************************************{DOM ELEMENT}***********************************************

const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// **************************************{function}***********************************************

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];

      rateEl.innerText=`1 ${currency_one} = ${rate} ${currency_two}`

      amountEl_two.value= (amountEl_one.value*rate).toFixed(2);
    });
}

// fetch  exchange rates and update the DOMS

currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

// swap button
swap.addEventListener('click',()=>{
    const temp= currencyEl_one.value;
    currencyEl_one.value =currencyEl_two.value;
    currencyEl_two.value= temp;

    // exchange value too
    const temp2 = amountEl_one.value;
    amountEl_one.value =amountEl_two.value;
    amountEl_two.value =temp2;
    
    calculate();
})


// class App{

//     constructor(input1,input2){
//         this.input1 = input1;
//         this.input2 =input2;
//     }
//    async getCurrency(){

//     const response= await fetch(``);
//     const data= await response.json();
//     console.log(data);

//    };
// }
