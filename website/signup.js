import Cookies from "./_cookies";
import { send } from "./_utils";

/**@type {HTMLButtonElement} */
let signup = document.getElementById("signup");
/**@type {HTMLButtonElement} */
let logInButton = document.getElementById("logInButton");
/**@type {HTMLInputElement} */
let username = document.getElementById("Username");
/**@type {HTMLInputElement} */
let password = document.getElementById("Password");

signup.onclick = async function () {
    /**@type {number} */
    let id = await send("/signIn", { username: username.value, password: password.value });
    

    top.location.href = "index.html";
};


logInButton.onclick = function () {
    top.location.href = "index.html";
}