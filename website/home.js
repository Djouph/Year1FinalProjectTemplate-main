/**@type {HTMLDivElement} */
let previewsContainer = document.getElementById("previewsContainer");

let previews = await send("/getPreviews")

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
  let a = document.createElement("a");
  a.classList.add("preview");
  a.href = "page.html?pageId" + preview.id;

  let titleDiv = document.createrElement("div");
  titleDiv.classList.add("Page");
  titleDiv.innerText = preview.date;
  a.appendChild(titleDiv);
}