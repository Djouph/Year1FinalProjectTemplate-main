import { getQuery, send } from "./_utils";

/**@type {HTMLTitleElement} */
let title = document.getElementsByTagName("title")
/**@type {HTMLHeadingElement} */
let date = document.getElementById("date");
/**@type {HTMLTextAreaElement} */
let text = document.getElementById("textarea");
/**@type {{pageId: string}} */
let query = getQuery();

let pageId = Number(query.pageId);


async function appendBook() {
    /**@type {Page} */
    let page = await send("/getPage", pageId);
    console.log(page);
    document.title = page.Date;
    title.innerText = page.Date;
    text.innerText = page.text;
    date.innerText = page.Date
}

appendBook();