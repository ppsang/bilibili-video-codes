class CanvasNest {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    this.lineColor = '255, 0, 0';
    this.pointColor = '255, 0, 0';
    this.pointCount = 99;

    this.points = this.randomPoints();
    this.current = {
      x: null,
      y: null,
      max: 20000,
    };
    this.all = this.points.concat([this.current]);

    this.bindEvent();

    this.requestFrame(this.drawCanvas);
  }

  bindEvent() {
    window.onmousemove = (e) => {
      this.current.x = e.clientX - this.canvas.offsetLeft;
      this.current.y = e.clientY - this.canvas.offsetTop;
    };

    window.onmouseout = () => {
      this.current.x = null;
      this.current.y = null;
    };
  }

  randomPoints() {
    const points = [];
    for (let i = 0; i < this.pointCount; i++) {
      points.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        xa: 2 * Math.random() - 1,
        ya: 2 * Math.random() - 1,
        max: 6000,
      });
    }
    return points;
  }

  drawCanvas() {
    const {
      all,
      points,
      context,
      canvas: { width, height },
    } = this;

    context.clearRect(0, 0, width, height);

    points.forEach((point, idx) => {
      point.x += point.xa;
      point.y += point.ya;
      point.xa *= point.x > width || point.x < 0 ? -1 : 1;
      point.ya *= point.y > width || point.y < 0 ? -1 : 1;
      context.fillStyle = `rgba(${this.pointColor})`;
      context.fillRect(point.x - 0.5, point.y - 0.5, 1, 1);

      for (let i = idx + 1; i < all.length; i++) {
        let nextPoint = all[i];
        let dist = Math.pow(point.x - nextPoint.x, 2) + Math.pow(point.y - nextPoint.y, 2);
        if (dist < nextPoint.max) {
          let d = (nextPoint.max - dist) / nextPoint.max;
          context.beginPath();
          context.lineWidth = d;
          context.strokeStyle = `rgba(${this.lineColor}, ${d})`;
          context.moveTo(point.x, point.y);
          context.lineTo(nextPoint.x, nextPoint.y);
          context.stroke();
        }
      }
    });

    this.requestFrame(this.drawCanvas);
  }

  requestFrame(func) {
    this.timer = requestAnimationFrame(() => func.call(this));
  }
}

window.onload = () => new CanvasNest(document.querySelector('#canvas'));
