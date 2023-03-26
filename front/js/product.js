

const itemPrice = document.querySelector('#price');
const itemDescription = document.querySelector('#description');
const itemcolors = document.querySelector('#colors');
const itemTitle = document.querySelector('#title');
const btnAddToCart = document.getElementById('addToCart');
const itemImg = document.querySelector('.item__img');


const productId = new URL(location).searchParams.get('id');{
fetch(`http://localhost:3000/api/products/${productId}`) 
.then((res) => res.json())
.then((data) => displayProduct(data));

};

function displayProduct(data){
    itemImg.appendChild(document.createElement('img')).src = data.imageUrl;
    itemTitle.textContent = data.name;
    itemPrice.textContent = data.price;
    itemDescription.textContent = data.description;
    for(let color of data.colors){
        let newOption = document.createElement('option');
        newOption.innerHTML = `<option value="${color}">${color}</option>`;
        itemcolors.append(newOption);
    };
};

const addToCart = document.getElementById("addToCart")

addToCart.addEventListener("click", () => {
    

    let colors = document.getElementById ("colors").value;
    console.log(colors.value);
    let quantity = document.getElementById("quantity").value;
    console.log(quantity.value);
    console.log(productId);
    
    let arrayProduct = {
        idProduit : productId,
        color : colors,
        quantity : quantity
    }

let getPanier = JSON.parse(localStorage.getItem("arrayProduct")) || []; 

    let foundproduct = getPanier.find(p => p.id = productId)
    if(foundproduct != undefined){
        foundproduct.quantity++;
    }else{

        getPanier.push(arrayProduct)
    }
    
    localStorage.setItem("arrayProduct", JSON.stringify(getPanier));
    
})




 
