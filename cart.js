const cartContainer = document.getElementById("cart-container");
const totalPriceElement = document.getElementById("total-price");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function

function renderCart() {
    cartContainer.innerHTML = "";
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <h2>Your cart is empty! 🛒</h2>
            <p>Your cart is getting lonely , fill it up with products.</p>
        `;
        totalPriceElement.style.display = "none";
        return;
    } else {
        totalPriceElement.style.display = "block";
    }

    cart.forEach((item, index) => {
        totalPrice += item.price * item.qty;

        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-details">
                <h4>${item.title}</h4>
                <p>$${item.price} x ${item.qty} = $${item.price * item.qty}</p>
            </div>
            <div class="quantity">
                <button onclick="updateQty(${index}, 1)">+</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${index}, -1)">-</button>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">❌</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = `Total: $ ${totalPrice}`;
}


function updateQty(index, change) {
    if (cart[index].qty + change > 0) {
        cart[index].qty += change;
    } else {
        removeItem(index);
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to checkout...");
    localStorage.removeItem("cart");
    location.reload();
}

//auto call this function when page loads funciton

renderCart();
