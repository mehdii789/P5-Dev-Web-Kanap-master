    function basketEmpty(){
    document.querySelector('.cartAndFormContainer h1').innerHTML = 'Votre panier est vide.';
    document.querySelector('.cart').style.display = 'none';
};

     function saveBasket(basket){
    localStorage.setItem('basket', JSON.stringify(basket));
};

     function getBasket(){
    let basket = localStorage.getItem('basket');
    if(basket == null){
        return [];
    } else {
        return JSON.parse(basket);
    }
};

    function deleteProductInBasket(target){
    let basket = getBasket();
    basket = basket.filter(p => p.id !== target.getAttribute('data-id') || p.color !== target.getAttribute('data-color'))
     saveBasket(basket);
     //refresh
     setTimeout(() => {
        window.location.reload();
    }, 200);
    if(basket.length === 0){
        localStorage.clear();
        basketEmpty();
    }     
};

    function addBasket(product) {
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id && p.color == product.color);
    if(foundProduct != undefined){
        let newQuantity = foundProduct.quantity + product.quantity;
        foundProduct.quantity = newQuantity;
    }else{
        basket.push(product);
    }

    saveBasket(basket);
};

let productApi = [];
let productStorage = [];
let totalProductsQuantity = 0;
let totalProductsPrice = 0;

//Récupération des produits enregistrés dans le LS et appel de l'api
function displayProduct(){

let basket = getBasket();

if(basket.length === 0){
    basketEmpty();
}else{
    for(let product of basket){
        fetch(`http://localhost:3000/api/products/${product.id}`) 
        .then(res => {
            
                res.json().then(data => {
                    productApi.push(data);
                    productStorage.push(product);                
                    
                    if(productApi.length === basket.length){
                        showDetails(productApi, productStorage)
                    }               
                })
            }
    )}
}};

function showDetails(productApi, productStorage){
    for(let i = 0; i < productApi.length; i++){

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
        //productColor.style.fontSize = "20px";

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

        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = `${productStorage[i].quantity}`;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
  
        //Total product quantity
        totalProductsQuantity += productStorage[i].quantity;
        document.getElementById("totalQuantity").innerHTML = totalProductsQuantity;
        //Total product price
        totalProductsPrice += productStorage[i].quantity * productApi[i].price;
        document.getElementById("totalPrice").innerHTML = totalProductsPrice;

        changeTotal(productApi);

        deleteProduct();
            
        function changeTotal(productApi){
            let basket = getBasket();
            let allInputQuantity = document.querySelectorAll('.itemQuantity');
            allInputQuantity.forEach(input => {
                input.addEventListener('change', e => {
                    let targetProduct = e.target.closest("article");
                    let foundTargetProduct = basket.find(product => product.id == targetProduct.getAttribute('data-id') && product.color == targetProduct.getAttribute('data-color'));
                    foundTargetProduct.quantity = Number(input.value); 
                    saveBasket(basket); 
                    
                    if (input.value <= 0) {
                        input.value = 1;
                        saveBasket(basket);
                    }; 

                    basket = getBasket();
                    let newQuantity = [];
                    let newPrice = [];   

                    for(let j = 0; j < basket.length; j++){
                        if(basket[j].quantity <= 0){
                            basket[j].quantity = 1;
                            saveBasket(basket);
                        };
                        newQuantity.push(basket[j].quantity);
                        saveBasket(basket);
                    };
                    for(let i = 0; i < productApi.length; i++){                                
                        newPrice.push(productApi[i].price);
                    };
                    
                    //Somme de toutes les quantités
                    const newTotalProduct = newQuantity.reduce((acc, x) => {
                        return acc + x;
                    });

                    //Quantité multipliée par le prix
                    let totalProductsPrice = 0;
                    for(let i = 0; i < newQuantity.length; i++){
                        totalProductsPrice += newQuantity[i] * newPrice[i];
                    };
                    
                    //Nouvelle quantité totale
                    totalProductsQuantity = newTotalProduct;
                    document.getElementById("totalQuantity").innerHTML = totalProductsQuantity;
                    //Nouveau prix total
                    document.getElementById("totalPrice").innerHTML = totalProductsPrice;
                })
            })
        }
    }
};
displayProduct();

function deleteProduct(){
    const deleteItem = document.querySelectorAll('.deleteItem');
          
    deleteItem.forEach(item => {
        item.addEventListener('click', () => {
            let target = item.closest('article');
            deleteProductInBasket(target)
            target.style.display = "none";
            
        }); 
    });
};



