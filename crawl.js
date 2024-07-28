import {JSDOM} from "jsdom";


const normalizeURL = (testUrl) =>{
    const myURL = new URL(testUrl)
    const domain = myURL.host
    let path = myURL.pathname
    if (path.at(-1) === "/"){
        path  = path.slice(0, -1)
    }
    return domain + path

};

function getURLsFromHTML(html, baseURL) {
    const urls = []
    const dom = new JSDOM(html)
    const anchors = dom.window.document.querySelectorAll("a")
  
    for (const anchor of anchors) {
      if (anchor.hasAttribute("href")) {
        let href = anchor.getAttribute("href")
  
        try {
          href = new URL(href, baseURL).href
          urls.push(href)
        } catch(err) {
          console.log(`${err.message}: ${href}`)
        }
      }
    }
  
    return urls
  };

  async function fetchHTML(url) {
    let res
    try {
      res = await fetch(url)
    } catch (err) {
      throw new Error(`Got Network error: ${err.message}`)
    }
  
    if (res.status > 399) {
      throw new Error(`Got HTTP error: ${res.status} ${res.statusText}`)
    }
  
    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
      throw new Error(`Got non-HTML response: ${contentType}`)
    }
  
    return res.text()
  }

 async function crawlPage (baseURL, currentURL = baseURL, pages = {}) {
    const normalizedCurrent = normalizeURL(currentURL)
    const currentURLObj = new URL(currentURL);
    const baseURLObj = new URL(baseURL)
    if (currentURLObj.hostname !== baseURLObj.hostname){
        return pages
    }
    
    
    if (pages[normalizedCurrent]){
        pages[normalizedCurrent]++
        return pages
        }
      else{
            pages[normalizedCurrent] = 1
        }
    console.log(`crawling ${currentURL}`)
    let html = ''
    try {
      html = await fetchHTML(currentURL)
    } catch (err) {
      console.log(`${err.message}`)
      return pages
    }
  
    // recur through the page's links
    const nextURLs = getURLsFromHTML(html, baseURL)
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
  
    return pages
  };



export {normalizeURL, getURLsFromHTML, crawlPage};