const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "High quality sound with noise cancellation.",
        price: 1999
    },
    {
        id: 2,
        name: "Smart Watch",
        description: "Track your fitness and notifications.",
        price: 2999
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        description: "Portable speaker with deep bass.",
        price: 1499
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let selectedProduct = null;

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        productList.innerHTML += `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
                <button onclick="viewDetails(${product.id})">View Details</button>
            </div>
        `;
    });
}

function viewDetails(id) {
    selectedProduct = products.find(p => p.id === id);
    document.getElementById("modal-title").innerText = selectedProduct.name;
    document.getElementById("modal-description").innerText = selectedProduct.description;
    document.getElementById("modal-price").innerText = "Price: ₹" + selectedProduct.price;
    document.getElementById("product-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("product-modal").classList.add("hidden");
}

function addToCart() {
    cart.push(selectedProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    closeModal();
}

function updateCart() {
    document.getElementById("cart-count").innerText = cart.length;
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} - ₹${item.price}</p>`;
    });

    document.getElementById("cart-total").innerText = total;
}

function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("hidden");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully!");
    cart = [];
    localStorage.removeItem("cart");
    updateCart();
    toggleCart();
}

displayProducts();
updateCart();
