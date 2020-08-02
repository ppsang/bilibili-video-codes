const $ = (str) => document.querySelector(str);

$('.song-disc').addEventListener('click', () => {
  correctCoverRotate();

  $('.song-needle').classList.toggle('play');
  $('.song-img').classList.toggle('play');
  $('.play-btn').classList.toggle('play');
});

function correctCoverRotate() {
  const isPlaying = $('.play-btn').classList.contains('play');
  const nextPlay = !isPlaying;
  // 下一步静止的时候才纠正旋转
  if (!nextPlay) {
    const $songCover = $('.song-disc__cover');
    const $songImg = $('.song-img');
    const songImgMatrix = window.getComputedStyle($songImg).getPropertyValue('transform');
    const songCoverMatrix = window.getComputedStyle($songCover).getPropertyValue('transform');
    if (songCoverMatrix === 'none') {
      // 第一次暂停
      $songCover.style.transform = songImgMatrix;
    } else {
      const matrix1 = parseMatrix(songCoverMatrix);
      const matrix2 = parseMatrix(songImgMatrix);
      const angle1 = calcAngle(matrix1[0], matrix1[1]);
      const angle2 = calcAngle(matrix2[0], matrix2[1]);
      const angle = angle1 + angle2;
      const radian = (Math.PI / 180) * angle;
      const [a, b, c, d] = [Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian)];
      $songCover.style.transform = `matrix(${a}, ${b}, ${c}, ${d}, 0, 0)`;
    }
  }
}

/**
 * 解析 matrix 数据
 * @param {String} matrix "matrix(-0.97874, 0.205104, -0.205104, -0.97874, 0, 0)"
 * @returns {Array} [a, b, c, d, e, f]
 */
function parseMatrix(matrix) {
  const start = matrix.indexOf('(') + 1;
  const end = matrix.indexOf(')');
  const content = matrix.slice(start, end);
  const values = content.split(', ');
  return values;
}

function calcAngle(a, b) {
  const radian = Math.atan2(b, a);
  const angle = radian * (180 / Math.PI);
  return angle;
}
