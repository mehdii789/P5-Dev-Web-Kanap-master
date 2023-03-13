

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

