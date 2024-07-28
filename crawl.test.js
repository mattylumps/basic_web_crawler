import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";


test("submits url and expects to be normalized", ()=>{
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
});
test("submits url and expects to be normalized", ()=>{
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe("blog.boot.dev/path")
});
test("submits url and expects to be normalized", ()=>{
    expect(normalizeURL("http://blog.boot.dev/path")).toBe("blog.boot.dev/path")
});

test("converts relative URLs to absolute URLs", () => {
    const html = `
        <html>
            <body>
                <a href="/path/to/page">Link</a>
                <a href="https://anotherwebsite.com/page">External Link</a>
            </body>
        </html>
    `;
    const baseURL = "https://example.com";

    const expectedURLs = [
        "https://example.com/path/to/page",
        "https://anotherwebsite.com/page"
    ];

    expect(getURLsFromHTML(html, baseURL)).toEqual(expectedURLs);
});
test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  });

