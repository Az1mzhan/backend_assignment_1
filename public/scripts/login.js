import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const handleLogin = async (e) => {
  e.preventDefault();

  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password === confirmPassword) {
    await axios.post("/auth/login", {
      username: username,
      password: password,
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-button")
    .addEventListener("click", handleLogin);
});
