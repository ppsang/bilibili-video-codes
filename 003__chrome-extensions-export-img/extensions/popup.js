class Popup {
  constructor() {
    this.tab = null
    this.init()
  }

  init() {
    this.initTab()
      .then(() => this.bindEvent())
  }

  initTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        this.tab = tabs[0]

        chrome.tabs.executeScript(this.tab.id, {file: 'page.js'}, () => {
          resolve()
        })
      })
    })
  }

  bindEvent() {
    chrome.tabs.sendMessage(this.tab.id, {msg: 'export'}, (images) => {
      chrome.storage.local.set({images}, () => {
        chrome.tabs.create({
          url: chrome.extension.getURL('images.html')
        })
      })
    })
  }
}

new Popup()