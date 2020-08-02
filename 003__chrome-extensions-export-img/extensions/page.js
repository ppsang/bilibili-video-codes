
function getProperty(el, property) {
  return window.getComputedStyle(el).getPropertyValue(property)
}

function getAllImages() {
  const allElements = document.querySelectorAll('body *')
  let images = []
  let srcList = []

  allElements.forEach(el => {
    let src = ''

    if (el.tagName.toLowerCase() === 'img') {
      // 从 img 的 src 里面获取图片
      const _src = el.getAttribute('src')
      _src && (src = _src)
    } else {
      // 从其他元素的 background-image 获取图片
      const _src = getProperty(el, 'background-image')
      if (_src.indexOf('url(') === 0) {
        src = _src.slice(5, _src.length - 2)
      }
    }

    if (src) {
      const { width, height } = el.getBoundingClientRect()
      // 过滤小图片
      if (width >= 100) {
        src = src.indexOf('//') === 0 ? `https:${src}` : src
        const item = { src, width, height }
        if (srcList.indexOf(src) === -1) {  // 避免重复
          srcList.push(src)
          images.push(item)
        }
      }
    }
  })

  return images
}

chrome.runtime.onMessage.addListener((data, sender, callback) => {
  console.log('receive message:', data)
  if (data.msg === 'export') {
    const images = getAllImages()
    console.log(`images:`, images)
    callback(images)
  }
})