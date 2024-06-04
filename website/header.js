import Cookies from "./_cookies";

/**@type {HTMLButtonElement} */
let logOutButton = document.getElementById("logOutButton");
/**@type {HTMLButtonElement} */
let Home = document.getElementById("home");
/**@type {HTMLButtonElement} */
let logIn = document.getElementById("login");
/**@type {HTMLButtonElement} */
let signup = document.getElementById("signup");

console.log(top.location.href)
if(top.location.href == "http://localhost:5000/website/index.html"){
    homebutton.classList.add("hidden");
}   
logOutButton.onclick = function () {
    Cookies.remove("id");

    top.location.href = "index.html";
}

home.onclick = function () {
    top.location.href = "index.html";
}

logIn.onclick = function () {
    top.location.href = "login.html";
}
signup.onclick = function () {
    top.location.href = "sighup.html";
}

let id = Cookies.get("id");

if(id == null){
    loggedInDiv.classList.add("hidden");
    Cookies.remove("id");
}else{
    logoutdiv.classList.add("hidden");
}