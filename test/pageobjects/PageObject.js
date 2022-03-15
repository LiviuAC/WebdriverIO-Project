/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */

class PageObject {
    /**
     * Opens a sub page of the page
     * @param path path of the sub page (e.g. /path/to/page.html)
     */
    open (path) {
        return browser.url(path)
    }

    back () {
        return browser.back()
    }

    title () {
        return browser.getTitle()
    }
}

exports.PageObject = PageObject
// exports pt clase, export pt variabile (const, let)
// npx wdio run ./wdio.conf.js pt a rula testele