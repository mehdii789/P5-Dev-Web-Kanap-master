    function basketEmpty(){
    document.querySelector('.cartAndFormContainer h1').textContent = 'Votre panier est vide.';
    document.querySelector('.cart').style.display = 'none';
};

     function saveBasket(basket){
    localStorage.setItem('basket', JSON.stringify(basket));
};
//renvoie la valeur de l'élément de l'objet de stockage spécifié//
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

//Formulaire

function saveForm(formValue){
    localStorage.setItem('form', JSON.stringify(formValue));
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
        productTitle.textContent = `${productApi[i].name}`;

        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.textContent = `${productStorage[i].color}`;

        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.textContent = `${productApi[i].price} €`;

        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.textContent = "Qté : ";

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
        productSupprimer.textContent = "Supprimer";
  
        //Total product quantity
        totalProductsQuantity += productStorage[i].quantity;
        document.getElementById("totalQuantity").textcontent = totalProductsQuantity;
        
        //Total product price
        totalProductsPrice += productStorage[i].quantity * productApi[i].price;
        document.getElementById("totalPrice").textContent = totalProductsPrice;

        changeTotal(productApi);

        deleteProduct();
            
        function changeTotal(productApi){
            let basket = getBasket();
            let allInputQuantity = document.querySelectorAll('.itemQuantity');
            //La méthode forEach()permet d'exécuter une fonction donnée sur chaque élément du tableau
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
                    document.getElementById("totalQuantity").textContent = totalProductsQuantity;
                    //Nouveau prix total
                    document.getElementById("totalPrice").textContent = totalProductsPrice;
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

//Message envoyé si l'entrée est vide lors de l'envoi du formulaire
function inputEmpty(errorMsg, input){
    errorMsg.textContent = 'Veuillez renseigner ce champ.';
    input.classList.add('showInputError')
    setTimeout(() => {
        errorMsg.textContent = '';
        input.classList.remove('showInputError')
    }, 3000);
};

//Message envoyé si la valeur n'est pas correcte
let errorMessage = [];
let message = {
    name : 'Minimum 3 caractères, maximum 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés',
    address : `Minimum 10 caractères, maximum 50 caractères. Les caractères spéciaux différents de , . ' - ne sont pas autorisés.`,
    city : 'Minimum 3 caractères, maximum 15 caractères. Les chiffres et caractères spéciaux ne sont pas autorisés',
    email : 'Veuillez renseigner une adresse mail valide.'
};
errorMessage.push(message);
function inputNotValid(input, errorMsg, msg){
    errorMsg.textContent = msg;
    input.classList.add('showInputError');
    setTimeout(() => {
        errorMsg.textContent = '';
        input.classList.remove('showInputError')
    }, 8000);
};

document.querySelector('.cart__order__form').addEventListener('submit', (e) => {
    
    

    let formValue = {
        firstName : document.querySelector('#firstName').value,
        lastName : document.querySelector('#lastName').value,
        address : document.querySelector('#address').value,
        city : document.querySelector('#city').value,
        email : document.querySelector('#email').value
    };

    let inputValidation = {
        firstName : false,
        lastName : false,
        address : false,
        city : false,
        email : false
    };


    if(formValue.firstName == ''){
        inputEmpty(document.querySelector('#firstNameErrorMsg'), document.querySelector('#firstName'));
    } else if(!/^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/.test(formValue.firstName)){
        inputNotValid(document.querySelector('#firstName'), document.querySelector('#firstNameErrorMsg'), errorMessage[0].name);
    } else {
        inputValidation.firstName = true;
    };

    if(formValue.lastName == ''){
        inputEmpty(document.querySelector('#lastNameErrorMsg'), document.querySelector('#lastName'));
    } else if(!/^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/.test(formValue.lastName)){
        inputNotValid(document.querySelector('#lastName'), document.querySelector('#lastNameErrorMsg'), errorMessage[0].name);   
    } else {
        inputValidation.lastName = true;
    };

    if(formValue.address == ''){
        inputEmpty(document.querySelector('#addressErrorMsg'), document.querySelector('#address'));
    } else if(!/^[a-zA-Z0-9\s,.'-]{10,50}$/.test(formValue.address)){
        inputNotValid(document.querySelector('#address'), document.querySelector('#addressErrorMsg'), errorMessage[0].address);   
    } else {
        inputValidation.address = true;
    };

    if(formValue.city == ''){
        inputEmpty(document.querySelector('#cityErrorMsg'), document.querySelector('#city'));
    } else if(!/^([a-zA-Z|\s]{3,15})?([-]{0,1})$/.test(formValue.city)){
        inputNotValid(document.querySelector('#city'), document.querySelector('#cityErrorMsg'), errorMessage[0].city);  
    } else {
        inputValidation.city = true;
    };

    if(formValue.email == ''){
        inputEmpty(document.querySelector('#emailErrorMsg'), document.querySelector('#email'));
    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formValue.email)){
        inputNotValid(document.querySelector('#email'), document.querySelector('#emailErrorMsg'), errorMessage[0].email);  
    } else {
        inputValidation.email = true;
    };

    if(inputValidation.firstName && inputValidation.lastName &&  inputValidation.address && inputValidation.city && inputValidation.email){
        saveForm(formValue);
        sendForm(formValue);
    }
}); 

//Envoyer les informations du panier et des produits du formulaire au serveur pour récupérer l'identifiant de la commande.
function sendForm(formValue){

    let productInStorage = getBasket();
    let products = [];
    for(let product of productInStorage){
        products.push(product.id)
    }

    let contact = formValue;

    const sendFormData = {
        contact,
        products,
      }

      const options = {
        //method: 'POST' sert a envoyer des données à un serveur  .//
        method: 'POST',
        body: JSON.stringify(sendFormData),
        headers: { 
            //Le type de média de toute ressource est déclaré dans la Content-Type propriété de l'en-tête de la requête //
          'Content-Type': 'application/json',
          // application/json est un type de médias sous application
        }
      };

    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
            .then(data => {
                document.location.href =`confirmation.html?id=${data.orderId}`;
                localStorage.clear();
    });
};      



