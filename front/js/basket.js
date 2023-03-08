const addToCart = document.getElementById("addToCart")

addToCart.addEventListener("click", () => {
    let targetURL = 'cart.html';
    let newURL = document.createElement('a');
    newURL.href = targetURL;
    document.body.appendChild(newURL);
    newURL.click();
})

function saveBasket(basket){
    localStorage.setItem ("basket",JSON.stringify(basket));
}

function getBasket(){
    let basket = localStorage.getItem("basket");
    if(basket == null){
        return [];
    }
    else{
        return JSON.parse(basket);
    }
}

function addBasket(product){
    let basket = getBasket();
    basket.push(product);
    saveBasket(basket)
}

