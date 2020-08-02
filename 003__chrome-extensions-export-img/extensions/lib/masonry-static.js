class Masonry {
  constructor(container, options = {}) {
    const {
      COLUMN_WIDTH = 190, // 元素宽度
      GAP_WIDTH = 15,     // 元素水平间距
      GAP_HEIGHT = 15,    // 元素垂直间距
    } = options;

    this.COLUMN_WIDTH = COLUMN_WIDTH;
    this.GAP_WIDTH = GAP_WIDTH;
    this.GAP_HEIGHT = GAP_HEIGHT;

    this.container = container;
    this.columnCount = 0;     // 列数
    this.columnHeights = [];  // 每列的高度组成的数组
    this.initStyle();
  }

  init(data) {
    this.data = data;
    this.resetColumnCount();
    this.appendCells();
    this.updateCells();
    this.bindEvent();
  }

  initStyle() {
    const style = document.createElement('style')
    style.innerHTML = `
      .cell {
        width: 190px;
        border-radius: 6px;
        overflow: hidden;
        position: absolute;
      }
      .img-box {
        font-size: 0;
      }
    `
    document.head.appendChild(style)
  }

  resetColumnCount() {
    this.columnCount = Math.max(2, Math.floor((document.body.offsetWidth + this.GAP_WIDTH) / (this.COLUMN_WIDTH + this.GAP_WIDTH)));
  }

  resetHeights() {
    this.columnHeights = new Array(this.columnCount).fill(0);
    this.container.style.width = this.columnCount * (this.COLUMN_WIDTH + this.GAP_WIDTH) - this.GAP_WIDTH + 'px';
  }

  bindEvent() {
    let resizeDelay = null
    window.onresize = () => {
      clearTimeout(resizeDelay)
      resizeDelay = setTimeout(() => this.reflowCells(), 300)
    }
  }

  appendCells() {
    let fragment = document.createDocumentFragment();
    let cells = [];

    this.data.forEach(item => {
      const cell = document.createElement('div')
      cell.classList.add('cell')
      cell.innerHTML = `
        <div class="img-box">
          <img src=${item.src} height="${item.height * this.COLUMN_WIDTH / item.width}" width="${this.COLUMN_WIDTH}" />
        </div>
      `
      cells.push(cell)
      fragment.appendChild(cell)
    })

    this.container.appendChild(fragment)

    return cells;
  }

  adjustCells(cells) {
    cells.forEach(cell => {
      const minHeight = Math.min(...this.columnHeights);
      const indexOfMinHeight = this.columnHeights.indexOf(minHeight);
      cell.style.left = indexOfMinHeight * (this.COLUMN_WIDTH + this.GAP_WIDTH) + 'px';
      cell.style.top = minHeight + 'px';
      this.columnHeights[indexOfMinHeight] = minHeight + this.GAP_HEIGHT + cell.offsetHeight;
    })
    this.container.style.height = Math.max(...this.columnHeights) + 'px';
  }

  reflowCells() {
    this.resetColumnCount();
    if (this.columnCount !== this.columnHeights.length) {
      this.updateCells();
    }
  }

  updateCells() {
    this.resetHeights();
    this.adjustCells(Array.from(this.container.children));
  }
}
