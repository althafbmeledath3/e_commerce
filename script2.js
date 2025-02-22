const productDetails = document.getElementById("product-details");
const productImage = document.getElementById("main-image");
const smallImagesContainer = document.getElementById("small-images");
const cartCount = document.getElementById("cart-count");
const reviewsContainer = document.getElementById("reviews-container");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Fetch product details from the API
fetch(`https://dummyjson.com/products/${productId}`)
  .then(response => response.json())
  .then(product => {
    // Set main product image
    productImage.src = product.thumbnail;

    // Display product details
    productDetails.innerHTML = `
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <h3>₹${product.price}</h3>
      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')">
        Add to Cart
      </button>
    `;

    // Display small images (hover effect to change main image)
    product.images.forEach(imgSrc => {
      let imgElement = document.createElement("img");
      imgElement.src = imgSrc;
      imgElement.alt = "Product Image";
      imgElement.addEventListener("mouseover", () => {
        productImage.src = imgSrc;
      });
      smallImagesContainer.appendChild(imgElement);
    });

    // ✅ Fetch and display customer reviews
    if (product.reviews && product.reviews.length > 0) {
      product.reviews.forEach(review => {
        let reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");
        reviewCard.innerHTML = `
          <h4>${review.reviewerName || "Anonymous"}</h4>  <!-- ✅ Corrected reviewer name -->
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

// ⭐ Function to generate star ratings (★ filled, ☆ empty)
function generateStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? "⭐" : "☆";
  }
  return stars;
}

// ✅ Cart Management: Add to cart & redirect to cart.html
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

  // Redirect to cart page after adding
  window.location.href = "cart.html";
}

// ✅ Update cart count in navbar
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.textContent = cart.length;
}

// Call this function on page load
updateCartCount();
