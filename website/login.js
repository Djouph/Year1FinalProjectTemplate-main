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

logInButton.onclick = async function () {
    /**@type {number} */
    let id = await send("/logIn", { username: username.value, password: password.value });
    
    Cookies.set("id", id);

    if(id == null){
        alert("Username or Password are incorect");
    }
    else{
        top.location.href = "index.html";    
    }
};


signup.onclick = function () {
    top.location.href = "index.html";
}