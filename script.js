const productsContainer = document.getElementById("products");
const searchBar = document.getElementById("searchBar");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch products from DummyJSON API
fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
        displayProducts(data.products);
    });

function displayProducts(products) {
    productsContainer.innerHTML = "";
    products.forEach(product => {
        let productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>₹${product.price}</p>
            <a href="page2.html?id=${product.id}">View Details</a>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Search Functionality
searchBar.addEventListener("input", (e) => {
    let searchTerm = e.target.value.toLowerCase();
    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => {
            let filteredProducts = data.products.filter(product => 
                product.title.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });
});

// Update Cart Count
document.getElementById("cart-count").textContent = cart.length;
