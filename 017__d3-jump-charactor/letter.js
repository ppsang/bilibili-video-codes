/**
 * 生成随机长度的字符数组 (长度大于6)
 * eg. ["d", "i", "j", "l", "m", "o", "r", "v", "w", "x", "y"]
 */
function randomLetters() {
  return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
    .slice(0, Math.floor(6 + Math.random() * 20))
    .sort();
}

// 边距
const margin = { left: 50, top: 50, right: 50, bottom: 50 };
const wrapper = { width: window.innerWidth * .8, height: 400 };

const bounds = {
  width: wrapper.width - margin.left - margin.right,
  height: wrapper.height - margin.top - margin.bottom
};

// 添加svg
const svg = d3.select('#app')
              .append('svg')
                .attr('width', wrapper.width)
                .attr('height', wrapper.height)
              .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top + wrapper.height / 2})`)

// 定义动画
const t = d3.transition().duration(750)

function update(data) {
  svg.selectAll('text')
    .data(data, d => d)
    .join(
      (enter) => {
        const enter_text = enter.append('text')
        enter_text.classed('enter', true)
                  .attr('y', -60)
                  .attr('x', (d, i) => i * 32)
                  .style('fill-opacity', .4)
                  .text(d => d)
                  .transition(t)
                  .attr('y', 0)
                  .style('fill-opacity', 1)
      },
      (update) => {
        return update
                  .attr('class', 'update')
                  .attr('y', 0)
                  .style('fill-opacity', 1)
                  .transition(t)
                  .attr('x', (d, i) => i * 32)

      },
      (exit) => {
        return exit
                .attr('class', 'exit')
                .transition(t)
                .attr('y', 60)
                .style('fill-opacity', .4)
                .remove()
      }
    )
}

update(randomLetters())

setInterval(() => {
  update(randomLetters())
}, 1500);