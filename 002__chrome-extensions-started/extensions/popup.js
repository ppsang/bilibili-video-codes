chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  const currentTab = tabs[0]

  chrome.tabs.executeScript(currentTab.id, {file: 'page.js'}, () => {
    bindEvent(currentTab)
  })
})

function bindEvent(currentTab) {
  document.querySelector('#on').addEventListener('click', () => {
    chrome.tabs.sendMessage(currentTab.id, {msg: 'on'})
  })
  document.querySelector('#off').addEventListener('click', () => {
    chrome.tabs.sendMessage(currentTab.id, {msg: 'off'})
  })
}