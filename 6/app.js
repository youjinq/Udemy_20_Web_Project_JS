const toggle= document.getElementById('toggle');
const close= document.getElementById('close');
const open= document.getElementById('open');
const modal= document.getElementById('modal');


// toggle nav

toggle.addEventListener('click', ()=>{

    // add a class toggle
    document.body.classList.toggle('show-nav');
})

// show modal

open.addEventListener('click', ()=>{
    modal.classList.add('show-modal');
})



// close button/ hide modal

close.addEventListener('click', ()=>{
    modal.classList.remove('show-modal');
})


// hide modal from outside click

window.addEventListener('click', e=>{
    
    e.target == modal ? modal.classList.remove('show-modal') : false
});