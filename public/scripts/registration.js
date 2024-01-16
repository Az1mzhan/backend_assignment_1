import axios from "https://cdn.jsdelivr.net/npm/axios@1.3.5/+esm";

const handleRegistration = async (e) => {
  e.preventDefault();

  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) return;

  const registrationRequest = await axios.post("/auth/registration", {
    username: username,
    password: password,
  });

  if (
    registrationRequest.data.message !==
    "The user has been successfully registered"
  )
    return;

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
    .getElementById("registration-button")
    .addEventListener("click", handleRegistration);
});
