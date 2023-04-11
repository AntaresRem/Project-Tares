document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");
  const logo = document.querySelector(".logo");
  logo.appendChild(canvas);

  const points = [
    { x: 50, y: 50 },
    { x: 150, y: 50 },
    { x: 250, y: 50 },
    { x: 350, y: 50 },
  ];

  let planePosition = 0;
  let t = 0;

  function drawLine() {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let point of points) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.strokeStyle = "#fff";
    ctx.stroke();
  }

  function drawPlane(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -5);
    ctx.lineTo(-5, 0);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
  }

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function updatePlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();

    let currentPoint = points[planePosition];
    let nextPoint = points[(planePosition + 1) % points.length];

    let x = lerp(currentPoint.x, nextPoint.x, t);
    let y = lerp(currentPoint.y, nextPoint.y, t);

    drawPlane(x, y);

    t += 0.01;
    if (t >= 1) {
      t = 0;
      planePosition = (planePosition + 1) % points.length;
    }
  }

  setInterval(updatePlane, 30);
});
