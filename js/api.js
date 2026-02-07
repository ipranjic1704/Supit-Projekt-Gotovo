const API_BASE = "https://www.fulek.com/data/api";

function getToken() {
  return localStorage.getItem("jwtToken");
}

function setToken(token) {
  localStorage.setItem("jwtToken", token);
}
