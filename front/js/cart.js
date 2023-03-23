let getPanier = JSON.parse(localStorage.getItem("arrayProduct"));

console.log(getPanier)

let productApi = [];
let productStorage = [];


const numberItems = localStorage.length
console.log ("nombre de produit = ",numberItems);


 
 
addItems()
cart.forEach((item) => displayItem(item))
 
function addItems(){
    for (let i = 0; i < numberItems; i++){
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject =JSON.parse(item)
        cart.push(itemObject)
        console.log(cart);
    }    
}
 
function displayItem(item){
    
    const article = makeArticle(item)
    displayArticle(article)
    console.log(article)
    const image = makeImageDiv(item)
    const div = makeImageDiv(item)
    article.appendChild(div)
}
 
function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}
 
function makeArticle (item){
    
    const article = document.createElement("article")
    console.log (item.id);
    article.classlist.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
 
function makeImageDiv(item){

    const div = document.createElement("div")
    div.classlList.add(cart__item__img)
    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}




function searchApi () {
    fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => showData(data));
    }

    function showDetails(){
        for(let i = 0; i < getPanier.length; i++){
            console.log(getPanier.length)
            let productArticle = document.createElement("article");
            productArticle.className = "cart__item"
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.setAttribute("data-id", `${productStorage[i].id}`);
            productArticle.setAttribute("data-color", `${productStorage[i].color}`);
    
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";
    
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = `${productApi[i].imageUrl}`;
           
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";
    
            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__description";
    
            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = `${productApi[i].name}`;
    
            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = `${productStorage[i].color}`;
    
            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = `${productApi[i].price} €`;
    
            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";
    
            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    
            let productQty = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQty);
            productQty.innerHTML = "Qté : ";
    
            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    
            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
    
        }
    }


