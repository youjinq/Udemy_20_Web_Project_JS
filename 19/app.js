const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

//   store list item
const listItems = [];

let dragStartIndex;

// inser list items into DOM

// another way without declare one more variable by [...]
function createList() {
  // map and sort doesnt assign to a variable , so it refresh everytime
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines"></i>
        </div>
        `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function addEventListeners() {
  const draggable = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");

  draggable.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItem.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  dragged= event.target;
  dragged.style.opacity= 0.5;

}

function dragOver(e){

  e.preventDefault();

}

function dragDrop(){
  console.log(this);

  const dragEndIndex=+this.getAttribute('data-index');

  swapItems(dragStartIndex,dragEndIndex);

  this.classList.remove('over');

  dragged.style.opacity= '';


  
}

// swap list items that are drag and drop
function swapItems(fromIndex, toIndex){
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);


}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

// check the order of list items
function checkOrder(){
  listItems.forEach((listItem,index)=>{
      const personName = listItem.querySelector('.draggable').innerText.trim();

      // compare with richestPeople with correct order
      if(personName !== richestPeople[index]){
          listItem.classList.add('wrong');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');


      }
  })

}



// event listener 

createList();


check.addEventListener('click',checkOrder);


