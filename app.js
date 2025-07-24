function logoutUser() {
  localStorage.removeItem("loggedInUser");
  const notyf = new Notyf();
  notyf.success("Logged out successfully!");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);

}



    function togglePassword() {
      const password = document.getElementById("password");
      const icon = document.querySelector(".toggle-password");
      if (password.type === "password") {
        password.type = "text";
        icon.textContent = "🙈";
      } else {
        password.type = "password";
        icon.textContent = "👁️";
      }
    }

const notyf = new Notyf();

function loginUser(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    notyf.success(`Welcome, ${user.name}!`);
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setTimeout(() => {
      window.location.href = "main.html";
    }, 1000);
  } else {
    notyf.error("Invalid email or password");
  }
}


 
    function handleSignup(e) {
      e.preventDefault();

      const name = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const notyf = new Notyf();

      if (!name || !email || !password) {
        notyf.error("Please fill all fields.");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const alreadyExists = users.some(user => user.email === email);

      if (alreadyExists) {
        notyf.error("Email already registered.");
        return;
      }

      users.push({ name, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      notyf.success("Account created!");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    }
  


document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginForm) loginForm.addEventListener("submit", loginUser);
  if (signupForm) signupForm.addEventListener("submit", handleEvent);
});




async function fetchingData() {
  let div = document.getElementById("products");
  let btns = document.getElementById("btn-Container");
  let cartItems = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");
  let cart = [];
  let total = 0;

  const response = await fetch('https://dummyjson.com/products');
  const res = await response.json();
  const products = res.products;

  const renderProducts = (filteredProducts) => {
    div.innerHTML = "";
    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "card m-2";
      card.style.width = "18rem";
      card.innerHTML = `
        <div class="w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-center flex flex-col items-center">
          <img src="${product.images[0]}" alt="Product Image"
            class="w-48 h-48 object-cover rounded-md shadow mb-4" />
          <h5 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">${product.title}</h5>
          <p class="text-gray-700 dark:text-gray-300 mb-4"><strong>Price: $${product.price}</strong></p>
          <button class="btn-17 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add To Cart</button>
        </div>
      `;

      const addToCartBtn = card.querySelector("button");
      addToCartBtn.addEventListener("click", () => {
        const existingItem = cart.find(item => item.title === product.title);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            title: product.title,
            price: product.price,
            quantity: 1
          });
        }

        total += product.price;
        updateCart();
      });

      div.appendChild(card);
    });
  };

  const updateCart = () => {
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = `<li class="italic text-gray-500 dark:text-gray-400">No items in cart</li>`;
    } else {
      cart.forEach((item) => {
        const itemDiv = document.createElement("li");
        itemDiv.className = "flex justify-between";
        itemDiv.innerHTML = `
          <span>${item.title} <span class="text-sm text-gray-400">(x${item.quantity})</span></span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItems.appendChild(itemDiv);
      });
    }

    cartTotal.textContent = total.toFixed(2);
  };

  const categories = [...new Set(products.map(product => product.category))];

  btns.innerHTML = "";
  categories.forEach((category) => {
    btns.innerHTML += `<button type="button" class="btn-17 capitalize px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">${category}</button>`;
  });
  const indBtn = btns.querySelectorAll("button");
  indBtn.forEach((filter) => {
    filter.addEventListener("click", (event) => {
      const clickedText = event.target.textContent;
      const filtered = products.filter(p => p.category === clickedText);
      renderProducts(filtered);

      if (!document.getElementById("showAllBtn")) {
        const showAllBtn = document.createElement("button");
        showAllBtn.id = "showAllBtn";
        showAllBtn.className = "btn-17 capitalize px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition mt-2";
        showAllBtn.textContent = "Show All Products";

        showAllBtn.addEventListener("click", () => {
          renderProducts(products);
          showAllBtn.remove();
        });

        btns.appendChild(showAllBtn);
      }
    });
  });

  renderProducts(products);
}

fetchingData();
