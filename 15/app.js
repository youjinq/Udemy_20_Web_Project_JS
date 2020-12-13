const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const resData = await res.json();

  showData(resData);


}
// show song and artistin DOM
function showData(data) {
  let output = "";
  data.data.forEach((song) => {
    result.innerHTML = `
        <ul class="songs">
          ${data.data
            .map(
              (song) => `<li>
          <span><strong>${song.artist.name}</strong> - ${song.title}</span>
          <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
        </li>`
            )
            .join("")}  
        </ul>
      `;
  });


  if(data.prev || data.next){
      more.innerHTML=`
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`: ""}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`: ""}

      `
  } else{
      more.innerHTML="";
  }

}

// get prev and next songs - herokuapp -to do proxy request
async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const resData = await res.json();
  
    showData(resData); 
}


async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
  
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>`;
  
    more.innerHTML = '';
  }


// **************************************{Event listenre}***********************************************
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searcTerm = search.value.trim();

  if (!searcTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searcTerm);
  }
});


// get lyrics button click
result.addEventListener('click',e=>{
   const clickedEl=e.target;
   if (clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist, songTitle);
  }
});