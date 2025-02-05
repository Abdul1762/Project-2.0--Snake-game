

let snake = [{ x: 0, y: 0 }];
let dx = 1;
let dy = 0;
let food = { x: 15, y: 15 };
let score = 0;
let gameInterval;
let gameRunning = false;

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createSnakeBody(x, y) {
    const snakeElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    snakeElement.setAttribute("x", x);
    snakeElement.setAttribute("y", y);
    snakeElement.setAttribute("width", "10");
    snakeElement.setAttribute("height", "10");
    snakeElement.setAttribute("class", "snake");
    return snakeElement;
}

function foodCreated(x, y) {
    const foodElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    foodElement.setAttribute("x", x);
    foodElement.setAttribute("y", y);
    foodElement.setAttribute("width", "10");
    foodElement.setAttribute("height", "10");
    foodElement.setAttribute("class", "food");
    return foodElement;
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 1;
        document.getElementById('score').textContent = "Score: " + score;
        document.getElementById('score').style.color = getRandomColor();
        makeFood();
    } else {
        snake.pop();
    }

    if (onImpact()) {
        clearInterval(gameInterval);
        alert("Game Over! Your score is " + score);
        gameRunning = false;
    }

    updateSnake();
}

function onImpact() {
    const head = snake[0];
    return (
        head.x < 0 || head.x >= 40 ||
        head.y < 0 || head.y >= 40 ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function updateSnake() {
    const game = document.getElementById("game");
    game.innerHTML = "";

    snake.forEach(segment => {
        const snakeElement = createSnakeBody(segment.x * 10, segment.y * 10);
        game.appendChild(snakeElement);
    });

    const foodElement = foodCreated(food.x * 10, food.y * 10);
    game.appendChild(foodElement);
}

function makeFood() {
    food.x = Math.floor(Math.random() * 40);
    food.y = Math.floor(Math.random() * 40);
}

function changeDirection(event) {
    const keyCode = event.keyCode;
    if (keyCode === 37 && dx !== 1) {
        dx = -1; dy = 0;
    } else if (keyCode === 38 && dy !== 1) { 
        dx = 0; dy = -1;
    } else if (keyCode === 39 && dx !== -1) { 
        dx = 1; dy = 0;
    } else if (keyCode === 40 && dy !== -1) { 
        dx = 0; dy = 1;
    }
}

function startGame() {
    if (!gameRunning) {
        document.addEventListener("keydown", changeDirection);
        gameInterval = setInterval(moveSnake, 100);
        gameRunning = true;
    }
}
