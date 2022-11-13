class Masonry {
  constructor(container, options = {}) {
    const {
      COLUMN_WIDTH = 190,   // 元素宽度
      GAP_WIDTH = 15,       // 元素水平间距
      GAP_HEIGHT = 15,      // 元素垂直间距
    } = options

    this.COLUMN_WIDTH = COLUMN_WIDTH
    this.GAP_WIDTH = GAP_WIDTH
    this.GAP_HEIGHT = GAP_HEIGHT

    this.container = container
    this.columnCount = 0  // 列数
    this.columnHeights = [] // 每列的高度组成的数组
  }

  init() {
    this.resetColumnCount()
    this.resetHeights()
    this.manageCells()
    this.bindEvent()
  }

  /* 计算列数 */
  resetColumnCount() {
    this.columnCount = Math.max(2, Math.floor((document.body.offsetWidth + this.GAP_WIDTH) / (this.COLUMN_WIDTH + this.GAP_WIDTH)))
  }

  /* 重置高度数组 */
  resetHeights() {
    this.columnHeights = new Array(this.columnCount).fill(0)
    this.container.style.width = this.columnCount * (this.COLUMN_WIDTH + this.GAP_WIDTH) - this.GAP_WIDTH + 'px'
  }
  
  /* 滚动到底部，加载更多 */
  manageCells() {
    const viewportTop = document.documentElement.scrollTop - this.container.offsetTop
    const viewportBottom = document.documentElement.clientHeight + viewportTop

    if (viewportBottom >= Math.min(...this.columnHeights)) {
      this.loadMoreCells()
    }
  }

  bindEvent() {
    let scrollDelay = null
    window.onscroll = () => {
      clearTimeout(scrollDelay)
      scrollDelay = setTimeout(() => this.manageCells(), 300)
    }

    let resizeDelay = null
    window.onresize = () => {
      clearTimeout(resizeDelay)
      resizeDelay = setTimeout(() => this.reflowCells(), 300)
    }
  }

  async loadMoreCells() {
    const cells = await this.appendCells()
    this.adjustCells(cells)
    this.manageCells()
  }

  async appendCells() {
    const data = await this.fetchData()
    
    const fragment = document.createDocumentFragment()
    const cells = []

    data.forEach(item => {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerHTML = `
        <div class="img-box">
          <img src="${item.src}" width="${this.COLUMN_WIDTH}" height="${item.height * this.COLUMN_WIDTH / item.width}" />
        </div>
      `
      cells.push(cell)
      fragment.appendChild(cell)
    })

    this.container.appendChild(fragment)

    return cells
  }

  adjustCells(cells) {
    cells.forEach(cell => {
      const minHeight = Math.min(...this.columnHeights)
      const indexOfMinHeight = this.columnHeights.indexOf(minHeight)
      cell.style.left = indexOfMinHeight * (this.COLUMN_WIDTH + this.GAP_WIDTH) + 'px'
      cell.style.top = minHeight + 'px'
      this.columnHeights[indexOfMinHeight] =  minHeight + this.GAP_WIDTH + cell.offsetHeight
    })
    this.container.style.height = Math.max(...this.columnHeights) + 'px'
  }

  reflowCells() {
    this.resetColumnCount()
    if (this.columnCount !== this.columnHeights.length) {
      this.resetHeights()
      this.adjustCells(Array.from(this.container.children))
      this.manageCells()
    } else {
      this.manageCells()
    }
  }

  // fetchData() {
  //   return fetch('http://192.168.5.2:5000/picture/get').then(res => res.json())
  // }

  // 模拟数据
  async fetchData() {
    return imgData
  }
}