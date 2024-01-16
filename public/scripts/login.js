import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const handleLogin = async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const request = await axios.post("/auth/login", {
    username: username,
    password: password,
  });

  const token = request.data.token;

  const authRequest = await axios.post(
    "/main",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (authRequest.data.message === "User is authenticated")
    location.pathname = "main";
};

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("login-button")
    .addEventListener("click", handleLogin);
});
