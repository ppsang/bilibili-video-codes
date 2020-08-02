const $bar = document.querySelector('.circle-bar')
const $circle = document.querySelector('.circle')
const $container = document.querySelector('.circle-container')

const circle_r = 320 / 2  // 圆形半径
const circle_b = 10       // 圆形边距(border-width)
const bar_r = 15          // 小球半径

function init() {
  let isDrag = false
  let mouse_offset = { x: 0, y: 0 }
  $bar.addEventListener('mousedown', (e) => {
    isDrag = true
    mouse_offset = getMouseOffset(e)
  })

  window.addEventListener('mousemove', (e) => {
    if (!isDrag) return
    const event_offset_x = (e.clientX
                              - mouse_offset.x
                              // - $container.offsetLeft
                              - circle_r)
    const event_offset_y = -(e.clientY
                              - mouse_offset.y
                              // - $container.offsetTop
                              - circle_r)

    const radian = Math.atan2(event_offset_y, event_offset_x)
    const x = Math.cos(radian) * (circle_r - circle_b / 2)
    const y = Math.sin(radian) * (circle_r - circle_b / 2)

    $bar.style.left = x - bar_r + circle_r + 'px'
    $bar.style.top = circle_r - (y + bar_r) + 'px'
    
    updateContent(radian)
  })

  window.addEventListener('mouseup', (e) => {
    isDrag = false
  })
}

function updateContent(radian) {
  let angle = radian * (180 / Math.PI)  // -180 ~ 180
  if (angle >= -180 && angle <= 90) {
    angle = 90 - angle
  } else {
    angle = 360 - (angle - 90)
  }
  // 0 ~ 360

  $circle.textContent = Math.floor(angle)
}

function getMouseOffset(e) {
  const mouse_offset_x = (e.clientX 
                            - $container.offsetLeft 
                            - circle_r)
  const mouse_offset_y = -(e.clientY
                            - $container.offsetTop
                            - circle_r)
  return {
    x: mouse_offset_x,
    y: mouse_offset_y
  }
}

init()