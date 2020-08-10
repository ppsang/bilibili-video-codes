class Person {
  /**
   * 
   * @param {Array} drawArgs [img, sx, sy, sw, sh, dx, dy, dw, dh]
   */
  constructor(drawArgs) {
    this.drawArgs = drawArgs
    this.width = drawArgs[3]
    this.height = drawArgs[4]

    this.x = 0
    this.y = 0
    this.endX = 0
    this.scaleX = 1

    this.anchorY = 0
    this.animeX = null
    this.animeY = null
  }

  render(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.scaleX, 1) // 是否水平翻转
    ctx.drawImage(...this.drawArgs)
    ctx.restore()
  }

  setPos(stage) {
    const direction = Math.random() > 0.5 ? 1 : -1  // 随机正反方向
    const offsetY = 100 - 350 * Math.random()
    const startY = stage.height - this.height + offsetY

    let startX
    let endX

    if (direction === 1) {
      // 正向，从左到右
      startX = -this.width
      endX = stage.width
      this.scaleX = 1
    } else {
      // 反向，从右到左
      startX = this.width + stage.width
      endX = 0
      this.scaleX = -1
    }

    this.x = startX
    this.y = startY
    this.endX = endX
    this.anchorY = startY
  }

  walk(onComplete) {
    const random = anime.random(5, 12)
    const xDuration = random * 1000
    const yDuration = random * 50
    const times = xDuration / yDuration

    this.animeX = anime({
      targets: this,
      x: this.endX,
      easing: 'linear',
      duration: xDuration,
      complete: onComplete
    })

    this.animeY = anime({
      targets: this,
      y: this.anchorY - 10,
      duration: yDuration,
      easing: 'easeInOutQuad',
      loop: times,
      direction: 'alternate'
    })
  }

  kill() {
    let activeInstances = anime.running;
    [this.animeX, this.animeY].forEach(anim => {
      const index = activeInstances.indexOf(anim, 1)
      index > -1 && activeInstances.splice(index, 1)
    })
  }
}