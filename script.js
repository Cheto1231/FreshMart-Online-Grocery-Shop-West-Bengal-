// Signup
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;
    localStorage.setItem(`user_${username}`, password);
    alert("Signed up successfully!");
    window.location.href = "login.html";
  };
}

// Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.onsubmit = (e) => {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    if (localStorage.getItem(`user_${username}`) === password) {
      alert("Login successful!");
      window.location.href = "products.html";
    } else {
      alert("Invalid credentials!");
    }
  };
}

// Product List
const products = [
  {
    name: { en: "Potato", bn: "আলু", hi: "आलू" },
    price: 20
  },
  {
    name: { en: "Tomato", bn: "টমেটো", hi: "टमाटर" },
    price: 25
  },
  {
    name: { en: "Banana", bn: "কলা", hi: "केला" },
    price: 30
  }
];

function getLang() {
  return localStorage.getItem("lang") || "en";
}

const productList = document.getElementById("productList");
if (productList) {
  const lang = getLang();
  products.forEach(prod => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${prod.name[lang]}</h3>
      <p>₹${prod.price}</p>
      <button onclick="addToCart('${prod.name[lang]}', ${prod.price})">Add</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

// Checkout Page
const cartItems = document.getElementById("cartItems");
if (cartItems) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let total = 0;
  cart.forEach(item => {
    const p = document.createElement("p");
    p.textContent = `${item.name} - ₹${item.price}`;
    cartItems.appendChild(p);
    total += item.price;
  });
  document.getElementById("totalPrice").textContent = `Total: ₹${total}`;
}

function simulatePayment() {
  alert("Payment Successful! Thank you.");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
}
