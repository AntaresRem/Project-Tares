document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.createElement("canvas");
  const contentArea = document.querySelector('main');
  const contentAreaWidth = contentArea.clientWidth;
  canvas.width = contentAreaWidth;
  canvas.height = 100;
  const ctx = canvas.getContext("2d");
  const canvasContainer = document.querySelector("#plane-canvas");
  canvasContainer.appendChild(canvas);

  const points = [
    { x: 0, y: 50 },
    { x: contentAreaWidth * 0.33, y: 50 },
    { x: contentAreaWidth * 0.66, y: 50 },
    { x: contentAreaWidth - 20, y: 50 }, // Subtract 20 from contentAreaWidth
  ];
  
  function drawLine() {
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let point of points) {
      ctx.lineTo(point.x, point.y);
    }
    ctx.strokeStyle = "#000";
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
    ctx.fillStyle = "#000";
    ctx.fill();
    ctx.restore();
  }

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  let planePosition = 0;
  let t = 0;

  function updatePlane() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLine();

    let currentPoint = points[planePosition];
    let nextPoint = points[(planePosition + 1) % points.length];

    let x = lerp(currentPoint.x, nextPoint.x, t);
    let y = lerp(currentPoint.y, nextPoint.y, t);

    drawPlane(x, y);

    t += 0.002;
    if (t >= 1) {
      t = 0;
      planePosition = (planePosition + 1) % points.length;
    }
  }

  function animationLoop() {
    updatePlane();
    requestAnimationFrame(animationLoop);
  }

  animationLoop();
});

document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all links
  const links = document.querySelectorAll('a[href^="#"]');
  for (const link of links) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
});
