import Cookies from "./_cookies";

/**@type {HTMLButtonElement} */
let logOutButton = document.getElementById("logOutButton");
/**@type {HTMLButtonElement} */
let Home = document.getElementById("home");

logOutButton.onclick = function () {
    Cookies.remove("id");

    top.location.href = "index.html";
}

Home.onclick = function () {
    top.location.href = "home.html";
}