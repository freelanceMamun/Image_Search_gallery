let index = 1 ;
let seachGolobal = "";
const apikey = '563492ad6f91700001000001c013b1578a9245a582d8bb6e6fb1e59b';
const inputFrom = document.querySelector(".Search");
const gallery =  document.querySelector(".gallery");
const loadMroeBtn  = document.querySelector(".button button");
const SearchValue =  document.querySelector("form");

window.onload = ()=>{
    getImage(index)
}

 async function getImage(index){
    const baseUrl  = `https://api.pexels.com/v1/curated?page=${index}&per_page=12`;
    const data =  await fetchDataFunction(baseUrl);
    GenerateHTML(data);
}

async function fetchDataFunction(baseUrl){
    const response = await fetch(baseUrl,{
        method:"GET",
        headers: {
            Accept: 'application/json',
            Authorization: apikey,
          }
    });
    const data =  await response.json()
    return data;

}

function GenerateHTML(photo){
    const alllPhoto = photo.photos ;
   
    alllPhoto.forEach(img => {
         const item = document.createElement("div");
               item.classList.add("item");
               item.innerHTML = `<a href="#">
               <img src="${img.src.medium}" alt="image">
                  <h3>${img.photographer}</h3>
               </a>` 
               gallery.appendChild(item);
    });
}

loadMroeBtn.addEventListener("click",loadMroe);
function loadMroe(e){
     e.preventDefault();
     let pageindex = index++ ;
     const loadMroeData =  e.target.getAttribute("data-img");
     if(loadMroeData === "curated"){
        getImage(pageindex)
     }else{
         GetMoreSearchImage(pageindex);
     }
} 


SearchValue.addEventListener("submit",(e)=>{
    e.preventDefault();
     let index = 1 ;
     getSearchImage(e)
  })



async function getSearchImage (e){
    loadMroeBtn.setAttribute("data-img","Search");
   gallery.innerHTML = '';
   const SearchValue = e.target.querySelector("input").value ;
   seachGolobal = SearchValue ;
    const BaseUrl  =  `https://api.pexels.com/v1/search?query=${SearchValue}&page=1&per_page=12` ;
    const data = await fetchDataFunction(BaseUrl);

    GenerateHTML(data);
    e.target.reset();
} 

 async function GetMoreSearchImage(index){
    const BaseUrl  =  `https://api.pexels.com/v1/search?query=${seachGolobal}&page=${index}&per_page=12`;
    const data =  await fetchDataFunction(BaseUrl);
    GenerateHTML(data);
    
}