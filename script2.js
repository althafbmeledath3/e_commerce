const productDetails = document.getElementById("product-details");
const productImage = document.getElementById("main-image");
const smallImagesContainer = document.getElementById("small-images");
const cartCount = document.getElementById("cart-count");
const reviewsContainer = document.getElementById("reviews-container");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");


fetch(`https://dummyjson.com/products/${productId}`)
  .then(response => response.json())
  .then(product => {
    //  main product image
    productImage.src = product.thumbnail;

    // product details
    productDetails.innerHTML = `
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <h3>$${product.price}</h3>
      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')">
        Add to Cart
      </button>
    `;

    // small images hover 
    product.images.forEach(imgSrc => {
      let imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      imgElement.alt = "Product Image";
      imgElement.addEventListener("mouseover", () => {
        productImage.src = imgSrc;
      });
      smallImagesContainer.appendChild(imgElement);
    });

    // customer reviews

    if (product.reviews && product.reviews.length > 0) {
      product.reviews.forEach(review => {
        let reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");
        reviewCard.innerHTML = `
          <h4>${review.reviewerName || "Anonymous"}</h4>  
          <div class="star-rating">${generateStars(review.rating)}</div>
          <p>${review.comment}</p>
        `;
        reviewsContainer.appendChild(reviewCard);
      });
    } else {
      reviewsContainer.innerHTML = "<p>No reviews available.</p>";
    }
  })
  .catch(error => {
    console.error("Error fetching product details:", error);
    reviewsContainer.innerHTML = "<p>Failed to load reviews.</p>";
  });

// generate stars hehe google fonts
function generateStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? "⭐" : "☆";
  }
  return stars;
}

// cart
function addToCart(id, title, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ id, title, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();

  // go to cart after adding
  window.location.href = "cart.html";
}

// cart counter function
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;
}

//auto caall on page onload
updateCartCount();
