import { send } from "./_utils";
import Cookies from "./_cookies";

let userid = Cookies.get("id");
console.log(userid);

/**@type {HTMLDivElement} */
let previewsContainer = document.getElementById("previewsContainer");

let previews = await send("/getPreviews", userid);
console.log(previews);

if(userid != undefined){

  for (let i=0; i<previews.length; i++){
    let previewA = createPreviewA(previews[i])
    previewsContainer.appendChild(previewA);
  }
}

/**
 * @typedef preview
 * @property {number} id
 * @property {string} date
 */

function createPreviewA(preview) {
  let div = document.createElement("div");
  let a = document.createElement("a");
  a.classList.add("preview");
  a.href = "page.html?pageId=" + preview.id;
  a.innerText = preview.date;

  div.appendChild(a);

  return div;
}

/** @type {HTMLAnchorElement} */
let add = document.getElementById("add");

add.onclick = function(){
  if(userid == undefined){
    alert("You nead to log in to use this function");
  }
  else{
    top.location.href = "NewPage.html";
  }
}