const API_KEY="6d7aa24dbb0f4ce780b41cb7647266b3";
const URL = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query) {
    const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles)
    console.log(data)
}

function bindData(articles) {
    const cardContainer =document.getElementById("card-container");
    const cardTemplate = document.getElementById("template");
    cardContainer.innerHTML=""

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article)
        cardContainer.appendChild(cardClone);

        
    });
    function fillDataInCard(cardClone,article) {
        const newsImg=cardClone.querySelector("#card-img");
        const newsTitle=cardClone.querySelector("#news-title");
        const newsSource=cardClone.querySelector("#news-source");
        const newsDesc=cardClone.querySelector("#news-desc");
        
        newsImg.src= article.urlToImage;
        newsTitle.innerHTML=article.title;
        newsDesc.innerHTML=article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta"
        });

        newsSource.innerHTML =`${article.source.name}  . ${date}`;

        cardClone.firstElementChild.addEventListener('click',()=>{
            window.open(article.url,"_blank")
        })


    }
}
let selectedItem =null;
function onNavItemClick(id) {
    fetchNews(id)
    const navItem =document.getElementById(id);
    selectedItem?.classList.remove("active");
    selectedItem=navItem;
    selectedItem.classList.add("active");
}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query)return;
    fetchNews(query);
    selectedItem?.classList.remove('active');
    selectedItem=null;
})

function reload(params) {
    window.location.reload();
}