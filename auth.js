// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsqRmSDUziS9KIX43ibaAoBpuaSc_0AfQ",
  authDomain: "generation-of-assam-learning.firebaseapp.com",
  projectId: "generation-of-assam-learning",
  storageBucket: "generation-of-assam-learning.firebasestorage.app",
  messagingSenderId: "886472905209",
  appId: "1:886472905209:web:f888aaa99b8c4bafb7ad28",
  measurementId: "G-5FC5JWMX8G"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };auth.js
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const auth = getAuth();

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const userSection = document.getElementById("userSection");
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

// 👀 Listen login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ USER LOGGED IN
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";

    userSection.style.display = "block";
    userEmail.textContent = user.email;
  } else {
    // ❌ USER NOT LOGGED IN
    loginBtn.style.display = "inline-block";
    signupBtn.style.display = "inline-block";

    userSection.style.display = "none";
  }
});

// 🚪 Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth);
});