import { send } from "./_utils";

/**@type {HTMLDivElement} */
let previewsContainer = document.getElementById("previewsContainer");

let previews = await send("/getPreviews");
console.log(previews);

for (let i=0; i<previews.length; i++){
  let previewA = createPreviewA(previews[i])
  previewsContainer.appendChild(previewA);
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