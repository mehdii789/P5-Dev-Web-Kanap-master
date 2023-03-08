function searchApi () {
    fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((data) => showData(data));
    }

    function showData(products) {
        for(let product of products) {
    
            let productLink = document.createElement('a');
            document.querySelector('.items').appendChild(productLink);
            productLink.href = `./product.html?id=${product._id}`;
    
            let productArticle = document.createElement('article');
            productLink.appendChild(productArticle);
    
            let productImg = document.createElement('img');
            productArticle.appendChild(productImg);
            productImg.src = `${product.imageUrl}`; 
            productImg.alt = `${product.altTxt}`;
    
            let productName = document.createElement('h3');
            productArticle.appendChild(productName);
            productName.innerHTML = `${product.name}`;
    
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.innerHTML = `${product.description}`;
        }
    };

    searchApi()