//function used to created dom elements


function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children) {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

//grab buttons
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const track = document.querySelector(".track");
const card = document.querySelector(".card-container")
let carouselWidth = document.querySelector(".carousel-container").offsetWidth;
let current = document.getElementById("0");
current.classList.add("selected")

let index = 0;
let width = window.width;
//resize event
window.addEventListener('resize',()=>{
  //if width is not changed, dont do anything
  if(carouselWidth == document.querySelector(".carousel-container").offsetWidth) return;
  //need to recalucate index, go back to first index:
  index = 0;
  current.classList.remove("selected");
  current = document.getElementById(String(index));
  current.classList.add("selected");
  track.style.transform =  `translateX(-${carouselWidth * index}px)`;
  prev.classList.remove("show");
  next.classList.remove("hide");
  carouselWidth = document.querySelector(".carousel-container").offsetWidth;

})



//onclick events, arrow
next.addEventListener("click", ()=>{
  index = Number(index);
  index += 1
  console.log(index);
  prev.classList.add('show');
  track.style.transform =  `translateX(-${carouselWidth * index}px)`;
  if(track.offsetWidth - index*carouselWidth < carouselWidth){
    next.classList.add("hide");
  }

  //on desktop, change buttons that are highlighted
if(carouselWidth > 1200){
  current.classList.remove("selected");
  current = document.getElementById(String(index));
  current.classList.add("selected");
}

})

prev.addEventListener("click",()=>{
  index = Number(index);
  index -= 1
  track.style.transform = `translateX(-${carouselWidth * index}px)`
  next.classList.remove("hide");
  if(index == 0){
    prev.classList.remove("show");
  }
   //only if laptop
  if(carouselWidth > 1200){
    current.classList.remove("selected");
    current = document.getElementById(String(index));
    current.classList.add("selected");
  }
})

//on click event arrow

document.querySelectorAll(".pageNum li").forEach(item =>{
  item.addEventListener("click",event =>{
    current.classList.remove("selected");
    current = event.target
    event.target.classList.add("selected");
    index = event.target.id;
    console.log("index:",index);
    track.style.transform = `translateX(-${carouselWidth * index}px)`
    
    if(index == 0){//first index
      next.classList.remove("hide");
      prev.classList.remove("show");
    }
    if(index == 3){ //last index
      next.classList.add("hide");
      prev.classList.add("show")
    }
    if(index != 0 && index!=3){ //not first or last
      prev.classList.add("show")
      next.classList.remove("hide");
    }
    
  })
})

