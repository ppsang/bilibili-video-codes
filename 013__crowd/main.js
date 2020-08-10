const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio
const stage = { width: 0, height: 0 }

let people = []
let crowd = []
let img

const config = {
  src: 'crowd-big.png',
  rows: 7,
  cols: 15
}

function loadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = src
  })
}

function getAllPeople() {
  const { rows, cols } = config
  const sw = img.naturalWidth / cols
  const sh = img.naturalHeight / rows
  
  const people = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const sx = col * sw
      const sy = row * sh
      people.push(new Person([img, sx, sy, sw, sh, 0, 0, sw, sh]))
    }
  }

  return people
}

function animPerson() {
  // 随机选择一个person
  const randomIndex = anime.random(0, people.length-1)
  const person = people.splice(randomIndex, 1)[0]

  // 给person加上起始位置和动画
  person.setPos(stage)
  person.walk(() => {
    // person动画完成之后，从crowd删除，重新放回people容器，供下次使用
    crowd.splice(crowd.indexOf(person), 1)
    people.push(person)
    animPerson()
  })

  // 放到人群里去渲染
  crowd.push(person)
  // 从上到下渲染，避免错乱
  crowd.sort((a, b) => a.anchorY - b.anchorY)
}

function animCrowd() {
  crowd.forEach(() => animPerson())
}

function startHandle() {
  people = getAllPeople()
  crowd.push(...people)
  animCrowd()
}

function resize() {
  // 初始化舞台大小
  stage.width = canvas.clientWidth
  stage.height = canvas.clientHeight
  // 处理设备分辨率dpr
  canvas.width = stage.width * dpr
  canvas.height = stage.height * dpr
  ctx.scale(dpr, dpr)

  // 重置人群
  crowd.forEach((person) => person.kill())
  people.length = 0
  crowd.length = 0

  startHandle()
}

function render() {
  ctx.clearRect(0,0, stage.width, stage.height)
  crowd.forEach((person) => person.render(ctx))
  requestAnimationFrame(render)
}

async function init() {
  img = await loadImg(config.src)
  resize()

  window.addEventListener('resize', resize)
  requestAnimationFrame(render)
}

init()