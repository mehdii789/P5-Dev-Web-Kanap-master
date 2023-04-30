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
            infoError.textContent = `<h1>Le produit est introuvable...</h1>`;
        }
    });

//Afficher les informations dans la page
function displayProduct(data){
    itemImg.appendChild(document.createElement('img')).src = data.imageUrl;
    itemTitle.textContent = data.name;
    itemPrice.textContent = data.price;
    itemDescription.textContent = data.description;
    for(let color of data.colors){
        let newOption = document.createElement('option');
        newOption.textContent = color;
        itemcolors.append(newOption);
    };
    getchosenProducts(data);
};
//les classes créer des objets avec des propriétés et des méthodes//
class optionsProductSelected {
    //Un constructeur est une fonction spéciale qui est utilisée pour initialiser un objet,//
    //Le rôle du constructeur est de définir les propriétés initiales de l'objet.//
    constructor(id, quantity, color){
        //this fait référence à l' objet 
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
                infoError.textContent = '<p>Veuillez choisir une quantité</p>';
                showError(infoError);
            } else {
                //new permet d'instentié//
                const productSelected = new optionsProductSelected(data._id, itemQuantity, itemcolors.value);  
                addBasket(productSelected);
                
            };    
    });
};




 
