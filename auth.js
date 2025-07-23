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

