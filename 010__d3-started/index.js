const margin = {
  left: 100,
  top: 40,
  right: 20,
  bottom: 30
};
const bounds = {
  width: 800 - margin.left - margin.right,
  height: 500 - margin.top - margin.bottom
};

// DOM 操作
const svg = d3.select('#app')
              .append('svg')
                .attr('width', 800)
                .attr('height', 500)
              .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`)

// 坐标系
const xScale = d3.scaleLinear()
                  .domain([0, 100])
                  .range([0, bounds.width])
const xAxisGenerator = d3.axisBottom().scale(xScale)
const xAxis = svg.append('g')
                  .attr('transform', `translate(0, ${bounds.height})`)  // x轴移动到底下
                  .transition()
                  .call(xAxisGenerator)

const yScale = d3.scaleLinear()
                  .domain([100, 200])
                  .range([bounds.height, 0])  // 注意坐标系实际是左上角
const yAxisGenerator = d3.axisLeft().scale(yScale)
const yAxis = svg.append('g')
                  .transition()
                  .call(yAxisGenerator)

// 数据绑定
const dataset = [ // 模拟数据
  {x: 10, y: 120},
  {x: 40, y: 190},
  {x: 80, y: 150},
]

const dots = svg.selectAll('.dot')
                .data(dataset)
                .join(
                  // ENTER (新元素)
                  (enter) => {
                    const enter_circle = enter.append('circle')
                    enter_circle.classed('dot', true)
                                .append('title')
                    return enter_circle
                  },
                  // UPDATE (已经存在的元素)
                  (update) => update,
                  // EXIT (即将移除的元素)
                  (exit) => exit.remove()
                )

// ENTER + UPDATE (包含新元素和已经存在的元素)
dots
  .attr('cx', d => xScale(d.x))
  .attr('cy', d => yScale(d.y))
  .transition()
  .attr('r', 20)
dots.select('title').text(d => `[${d.x}, ${d.y}]`)

// 交互
dots.on('mouseenter', function(d, i) {
  d3.select(this).transition().attr('r', 30)
})
dots.on('mouseleave', function(d, i) {
  d3.select(this).transition().attr('r', 20)
})