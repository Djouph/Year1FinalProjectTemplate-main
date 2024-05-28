import Cookies from "./_cookies";

/**@type {HTMLButtonElement} */
let logOutButton = document.getElementById("logOutButton");
/**@type {HTMLButtonElement} */
let Addpage = document.getElementById("Addpage");

logOutButton.onclick = function () {
    Cookies.remove("id");

    top.location.href = "index.html";
}

Addpage.onclick = function () {
    top.location.href = "NewPage.html";
}