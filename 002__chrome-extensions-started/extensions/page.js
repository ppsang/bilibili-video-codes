var styleId = '__htmlGray'

function getStyleEl() {
  return document.querySelector(`#${styleId}`)
}

function appendGrayStyle() {
  if (getStyleEl()) return

  const style = document.createElement('style')
  style.innerHTML = `
    html {
      filter: grayscale(100%);
      -webkit-filter: grayscale(100%);
    }
  `
  style.setAttribute('id', styleId)
  document.head.appendChild(style)
}

function deleteGrayStyle() {
  const style = getStyleEl()
  if (!style) return

  style.parentNode.removeChild(style)
}

// 监听消息
chrome.runtime.onMessage.addListener((data, sender, callback) => {
  if (data.msg === 'on') {
    appendGrayStyle()
  } else if (data.msg === 'off') {
    deleteGrayStyle()
  }
})