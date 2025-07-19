function log(event) {
    event.preventDefault();

    const notyf = new Notyf();

    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(username)) {
        notyf.error("Please enter a valid email address.");
        return false;
    }

    if (password.length < 6) {
        notyf.error("Password must be at least 6 characters.");
        return false;
    }

    notyf.success("Login successful!");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);

    return true;
}

async function fetchingData() {
    let div = document.getElementById("products");
    let btns = document.getElementById("btn-Container");
    let cart = [];
    let total = 0;

    const showSkeletons = () => {
        div.innerHTML = "";
        for (let i = 0; i < 8; i++) {
            div.innerHTML += `
            <div class="w-64 h-[350px] animate-pulse bg-gray-300 dark:bg-gray-700 rounded-lg shadow p-4"></div>
        `;
        }
    };

    const response = await fetch('https://dummyjson.com/products');
    const res = await response.json();
    let products = res.products;

    let categories = [...new Set(products.map(product => product.category))];

    btns.innerHTML = "";
    categories.forEach((category) => {
        btns.innerHTML += `<button type="button" class="btn-17 capitalize px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">${category}</button>`;
    });

    let indBtn = btns.querySelectorAll("button");
    indBtn.forEach((filter) => {
        filter.addEventListener("click", (event) => {
            let clickedText = event.target.textContent;
            let filtered = products.filter(p => p.category === clickedText);
            renderProducts(filtered);
        });
    });

    const renderProducts = (filteredProducts) => {
        div.innerHTML = "";
        filteredProducts.forEach((product) => {
            const card = document.createElement("div");
            card.className = "card m-2";
            card.style.width = "18rem";
            card.innerHTML = `
                <div class="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center flex flex-col items-center">
                    <img src="${product.images[0]}" 
                         alt="Product Image" 
                         class="w-48 h-48 object-cover rounded-md shadow mb-4" />
                    <h5 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">${product.title}</h5>
                    <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Price: $${product.price}</strong></p>
                    <button class="btn-17 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add To Cart</button>
                </div>
            `;

            const addToCartBtn = card.querySelector("button");
            addToCartBtn.addEventListener("click", () => {
                cart.push({
                    title: product.title,
                    price: product.price,
                });
                total += product.price;
                updateCart();
            });

            div.appendChild(card);
        });
    };

    const updateCart = () => {
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        cartItems.innerHTML = "";
        if (cart.length === 0) {
            cartItems.innerHTML = `<li class="italic text-gray-500 dark:text-gray-400">No items in cart</li>`;
        } else {
            cart.forEach((item) => {
                const itemDiv = document.createElement("li");
                itemDiv.className = "flex justify-between";
                itemDiv.innerHTML = `
                    <span>${item.title}</span>
                    <span>$${item.price.toFixed(2)}</span>
                `;
                cartItems.appendChild(itemDiv);
            });
        }

        cartTotal.textContent = total.toFixed(2);
    };

    showSkeletons();
    setTimeout(() => {
        renderProducts(products);
    }, 1500); 
}

fetchingData();