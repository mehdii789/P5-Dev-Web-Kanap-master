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

const itemImg = document.querySelector('.item__img');
const itemTitle = document.querySelector('#title');
const itemPrice = document.querySelector('#price');
const itemDescription = document.querySelector('#description');
const itemcolors = document.querySelector('#colors');
const btnAddToCart = document.getElementById('addToCart');
const blocItemContent = document.querySelector('.item__content__settings');

//recherche d'informations sur les produits par l'identifiant
const productId = new URL(location).searchParams.get('id');
fetch(`http://localhost:3000/api/products/${productId}`)
    .then(res => {
        if (res.ok) {
            res.json().then(data => {
                displayProduct(data);
            })
        } else {
            console.log('Retour du serveur : ', res.status);
            const infoError = document.querySelector('.item');
            infoError.innerHTML = `<h1>Le produit est introuvable...</h1>`;
        }
    });

//Afficher les informations dans la page
function displayProduct(data){
    itemImg.appendChild(document.createElement('img')).src = data.imageUrl;
    itemTitle.innerHTML = data.name;
    itemPrice.innerHTML = data.price;
    itemDescription.innerHTML = data.description;
    for(let color of data.colors){
        let newOption = document.createElement('option');
        newOption.innerHTML = `<option value="${color}">${color}</option>`;
        itemcolors.append(newOption);
    };
    getchosenProducts(data);
};

class optionsProductSelected {
    constructor(id, quantity, color){
        this.id = id, 
        this.quantity = Number(quantity),
        this.color = color
    }
};
//Envoi d'informations sur les produits sur le LS
function getchosenProducts(data){

        btnAddToCart.addEventListener('click', () => {

            const itemQuantity = document.getElementById('quantity').value;

            if(itemQuantity <= 0 ){
                infoError.innerHTML = '<p>Veuillez choisir une quantité</p>';
                showError(infoError);
            } else {
                const productSelected = new optionsProductSelected(data._id, itemQuantity, itemcolors.value);  
                addBasket(productSelected);
                
            };    
    });
};




 
