// part1- get post from api
// part 2- infine scolling



const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();

  return data;
}

// show Post in DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = ` <div class="number">${post.id}</div>
         <div class="post-info">
             <h2 class="post-title">${post.title}</h2>
             <p class="post-body">
                ${post.body}
             </p>
         </div>`;

    postsContainer.appendChild(postEl);
  });
}

// show loader & fetch more  posts
function showLoading(){
    // show loader
    loading.classList.add('show');
    // timer for loader and fetch new page
    setTimeout(()=>{
    loading.classList.remove('show');
    setTimeout(()=>{
        page++;
        showPosts()},300)
    },1000)


}

// filter
function filterPosts(e){
    const term= e.target.value.toUpperCase();
    const posts= document.querySelectorAll('.post');
    posts.forEach(post=>{
        const title= post.querySelector('.post-title').innerText.toUpperCase();
        const body= post.querySelector('.post-body').innerText.toUpperCase();

        if(title.indexOf(term) >-1 || body.indexOf(term) > -1){
            post.style.display='flex'
        } else{
            post.style.display ='none'
        }
    })
}

// show initial post

showPosts();

// event lsitenere

window.addEventListener('scroll',()=>{
    // number of px being scroll rom top=scrollTop; scroll height = the full height of element clientHeight= height of window in here
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if( scrollTop + clientHeight > scrollHeight-5){
        showLoading();
    }
})

filter.addEventListener('input',filterPosts);