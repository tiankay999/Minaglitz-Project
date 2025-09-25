document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartFab = document.querySelector('.cart-fab');
    const cartModalOverlay = document.querySelector('.cart-modal-overlay');
    const closeCartModalButton = document.querySelector('.close-cart-modal');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const cartFabCount = document.querySelector('.cart-fab-count');

    let cart = [];

    // Event Listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = getProductDetails(productCard);
            addToCart(product);
        });
    });

    cartFab.addEventListener('click', () => {
        cartModalOverlay.style.display = 'flex';
    });

    closeCartModalButton.addEventListener('click', () => {
        cartModalOverlay.style.display = 'none';
    });

    cartModalOverlay.addEventListener('click', (e) => {
        if (e.target === cartModalOverlay) {
            cartModalOverlay.style.display = 'none';
        }
    });

    // Functions
    function getProductDetails(productCard) {
        const name = productCard.querySelector('h4').innerText;
        const priceString = productCard.querySelector('.price').innerText;
        const price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
        const image = productCard.querySelector('img').src;

        return { name, price, image, quantity: 1 };
    }

    function addToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.name === product.name);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push(product);
        }

        updateCart();
    }

    function updateCart() {
        renderCartItems();
        updateCartTotal();
        updateCartFabCount();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>¢${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-increase" data-index="${index}">+</button>
                    <button class="remove-item" data-index="${index}">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        addCartItemEventListeners();
    }

    function addCartItemEventListeners() {
        const decreaseButtons = document.querySelectorAll('.quantity-decrease');
        const increaseButtons = document.querySelectorAll('.quantity-increase');
        const removeButtons = document.querySelectorAll('.remove-item');

        decreaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart[index].quantity++;
                updateCart();
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });

        // Payment form submission
        const paymentForm = document.querySelector('.payment-form form');
        if (paymentForm) {
            paymentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                processPayment();
            });
        }
    }
    function getProductDetails(productCard) {
        const name = productCard.querySelector('h4').innerText;
        const priceString = productCard.querySelector('.price').innerText;
        const price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
        const image = productCard.querySelector('img').src;

        return { name, price, image, quantity: 1 };
    }

    function addToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.name === product.name);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push(product);
        }

        updateCart();
    }

    function updateCart() {
        renderCartItems();
        updateCartTotal();
        updateCartFabCount();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>¢${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-actions">
                    <button class="quantity-decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-increase" data-index="${index}">+</button>
                    <button class="remove-item" data-index="${index}">&times;</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        addCartItemEventListeners();
    }

    function addCartItemEventListeners() {
        const decreaseButtons = document.querySelectorAll('.quantity-decrease');
        const increaseButtons = document.querySelectorAll('.quantity-increase');
        const removeButtons = document.querySelectorAll('.remove-item');

        decreaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart[index].quantity++;
                updateCart();
            });
        });

        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    function updateCartTotal() {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotalElement.innerText = `¢${total.toFixed(2)}`;
    }

    function updateCartFabCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartFabCount.innerText = totalItems;
    }

    function processPayment() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // Get form data
        const email = document.getElementById('user-email').value;
        const location = document.getElementById('user-location').value;
        const specialOffers = document.getElementById('special-offers').value;
        const phone = document.getElementById('phone-number').value;
        const network = document.getElementById('network').value;
        const total = parseFloat(cartTotalElement.innerText.replace('¢', ''));

        const userDetails = {
            email,
            location,
            specialOffers,
            phone,
            network
        };

        const orderData = {
            total,
            items: [...cart],
            userDetails,
            paymentMethod: 'Mobile Money'
        };

        // Save order using order tracker
        if (window.orderTracker) {
            window.orderTracker.addOrder(orderData);
        }

        // Clear cart after successful order
        cart = [];
        updateCart();

        // Close modal
        cartModalOverlay.style.display = 'none';

        // Show success message
        alert('Order placed successfully! You can track your order on the Orders page.');

        // Optionally redirect to orders page
        // window.location.href = 'orders.html';
    }
});
