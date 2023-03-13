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
    
    alert ("ok");
    let colors = document.getElementById ("colors");
    console.log(colors.value);
    let quantity = document.getElementById("quantity");
    console.log(quantity.value);
    console.log(productId);
    
    localStorage.setItem ("colors",JSON.stringify(colors.value));
    localStorage.setItem ("quantity",JSON.stringify(quantity.value));
    localStorage.setItem ("id",JSON.stringify(productId));

})