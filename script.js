// 1. Expanded Product Data
const products = [
    { 
        id: 1, 
        name: "8085 Microprocessor Trainer Kit", 
        description: "Complete assembly language programming learning kit with LED displays and hex keypad.",
        price: 145.00, 
        image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500" 
    },
    { 
        id: 2, 
        name: "Digital Oscilloscope", 
        description: "100MHz bandwidth, 2 channels. Perfect for signal processing and LTI system analysis.",
        price: 320.50, 
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500" 
    },
    { 
        id: 3, 
        name: "Mastering C++ & DSA Book", 
        description: "Comprehensive guide to linked lists, dynamic programming, and advanced data structures.",
        price: 49.99, 
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500" 
    },
    { 
        id: 4, 
        name: "Mechanical Coding Keyboard", 
        description: "Tactile switches with customizable RGB, ideal for long coding sessions.",
        price: 129.00, 
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500" 
    },
    { 
        id: 5, 
        name: "Studio Headphones", 
        description: "High-fidelity audio playback. Great for isolating noise while working or listening to your favorite tracks.",
        price: 199.99, 
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" 
    },
    { 
        id: 6, 
        name: "4K Dual Monitor Setup", 
        description: "Ultra HD IPS panels for maximum productivity and massive screen real estate.",
        price: 549.00, 
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500" 
    },
    {
        id: 7,
        name: "Digital Signal Processing Textbook",
        description: "Deep dive into LTI systems, Fourier transforms, decimation, and filter design.",
        price: 75.00,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"
    },
    
    {
        id: 8,
        name: "Pro Soldering Station",
        description: "Temperature-controlled soldering iron for precise circuit board repairs and DIY electronics.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500"
    }
];

// 2. State Management
let cart = [];

// 3. DOM Elements
const productList = document.getElementById('product-list');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartIcon = document.getElementById('cart-icon');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const totalPriceElement = document.getElementById('total-price');

// 4. Render Products
function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price-row">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="btn-add" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// 5. Cart Logic
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    // Check if item is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        // Add new item with quantity 1
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showToast(`Added ${product.name} to cart!`);
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Clear current items
    cartItemsContainer.innerHTML = '';
    
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align:center; color:#64748b; margin-top: 2rem;">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += (item.price * item.quantity);
            
            const cartItemHTML = document.createElement('div');
            cartItemHTML.classList.add('cart-item');
            cartItemHTML.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;
            cartItemsContainer.appendChild(cartItemHTML);
        });
    }

    cartCountElement.innerText = totalItems;
    totalPriceElement.innerText = totalPrice.toFixed(2);
}

// 6. UI Interactions (Sidebar & Toasts)
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
});

function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
}

closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ${message}`;
    
    toastContainer.appendChild(toast);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300); // Wait for fade out animation
    }, 3000);
}

// Checkout Button
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
    } else {
        alert("Processing order for Saloni Electronics...\nTotal: $" + totalPriceElement.innerText);
        cart = []; // Empty cart
        updateCartUI();
        closeCart();
    }
});

// Initialize
renderProducts();
updateCartUI();