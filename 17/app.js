const rulesBt = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

// create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  //   size is radius
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

// draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

//   draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  // offset is x coordinate from left at first shape
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// draw brick on canvas
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  // make empty array for each row
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// draw bricks on canvas
function drawBricks() {
  bricks.forEach((row) => {
    row.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}
// console.log(bricks);

// draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score:${score}`, canvas.width - 100, 30);
}

// move paddle on canvas
function movePaddle() {
  // default at 360 le, then everything add 8 to right or -8 to left, padle.dx =0 now
  paddle.x += paddle.dx;

  // wall detection
  // keepchangeing position + fixed small changing object > full container
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// !!!!important
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // wall collision (x)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    // reverse position in x
    ball.dx *= -1;
  }

  // wall collision (y)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    // reverse position in x
    ball.dy *= -1;
  }

  //   paddle collision 2x and 1 y direction- imagine the ball aldy hit the paddle
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  //   brick collision
  bricks.forEach((row) => {
    row.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;

          increaseScore();
        }
      }
    });
  });

  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// hit bottom and lose game

function increaseScore() {
  score++;

  if (score % (brickRowCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

// Make all bricks appear
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

function drawEverything() {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// add animation frame to repaint
function update() {
  movePaddle();
  moveBall();
  // draw everything
  drawEverything();

  // keep callback the function infinite
  requestAnimationFrame(update);
}
// keydown event
function KeyDown(e) {
  if (e.key === "Right" || e.key == "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

// keyup evenet- released then stop
function KeyUp(e) {
  if (
    e.key === "Right" ||
    e.key == "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

update();

// document event handlers
document.addEventListener("keydown", KeyDown);
document.addEventListener("keyup", KeyUp);

// rules and close event handlers
rulesBt.addEventListener("click", () => {
  rules.classList.add("show");
});

closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});
