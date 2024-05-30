/**@type {{pageId: string}} */
let query = getQuery();

let pageId = Number(query.pageId);


async function appendBook() {
    /**@type {Page} */
    let page = await send("/getPage", pageId);
  
    
}