chrome.storage.local.get('images', (data) => {
  const images = data.images

  if (images) {
    console.log(images)
    const $container = document.querySelector('#app')
    new Masonry($container).init(images)
  }
})