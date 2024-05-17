import Cookies from "./_cookies";
import { send } from "./_utils";

/**@type {HTMLButtonElement} */
let back = document.getElementById("back");
/**@type {HTMLButtonElement} */
let add = document.getElementById("add");
/**@type {HTMLInputElement} */
let date = document.getElementById("date");
/**@type {HTMLTextAreaElement} */
let text = document.getElementById("text");

add.onclick = async function () {
    send("/Add", { date: date.value, text: text.value ,userId: Cookies.get("id")});

    top.location.href = "home.html";
};

back.onclick = function () {
    top.location.href = "home.html";
}