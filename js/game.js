class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.canvas.width = 400;
        this.canvas.height = 400;
        
        // Game settings
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;
        this.snake = [{x: 10, y: 10}];
        this.food = {x: 15, y: 15};
        this.direction = {x: 0, y: 0};
        this.lastDirection = {x: 0, y: 0};
        this.score = 0;
        this.highScore = localStorage.getItem('snakeHighScore') || 0;
        this.gameSpeed = 150;
        this.gameLoop = null;
        this.isGameOver = false;

        // DOM elements
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('highScore');
        this.finalScoreElement = document.getElementById('finalScore');
        this.gameOverlay = document.getElementById('gameOverlay');
        this.startBtn = document.getElementById('startBtn');
        this.restartBtn = document.getElementById('restartBtn');

        // Initialize
        this.updateScores();
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
    }

    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (this.lastDirection.y !== 1) {
                    this.direction = {x: 0, y: -1};
                }
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (this.lastDirection.y !== -1) {
                    this.direction = {x: 0, y: 1};
                }
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (this.lastDirection.x !== 1) {
                    this.direction = {x: -1, y: 0};
                }
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (this.lastDirection.x !== -1) {
                    this.direction = {x: 1, y: 0};
                }
                break;
        }
    }

    startGame() {
        if (this.gameLoop) return;
        
        this.snake = [{x: 10, y: 10}];
        this.direction = {x: 0, y: 0};
        this.lastDirection = {x: 0, y: 0};
        this.score = 0;
        this.isGameOver = false;
        this.gameOverlay.classList.remove('active');
        this.generateFood();
        this.updateScores();
        
        this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
        this.startBtn.style.display = 'none';
    }

    restartGame() {
        this.gameOverlay.classList.remove('active');
        this.startGame();
    }

    update() {
        if (this.isGameOver) return;

        // Update last direction
        this.lastDirection = {...this.direction};

        // Move snake
        const head = {...this.snake[0]};
        head.x += this.direction.x;
        head.y += this.direction.y;

        // Check collisions
        if (this.checkCollision(head)) {
            this.gameOver();
            return;
        }

        // Add new head
        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            this.updateScores();
            this.generateFood();
        } else {
            this.snake.pop();
        }

        this.draw();
    }

    checkCollision(head) {
        // Wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return true;
        }

        // Self collision
        return this.snake.some((segment, index) => {
            if (index === 0) return false;
            return segment.x === head.x && segment.y === head.y;
        });
    }

    generateFood() {
        do {
            this.food.x = Math.floor(Math.random() * this.tileCount);
            this.food.y = Math.floor(Math.random() * this.tileCount);
        } while (this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y));
    }

    draw() {        // Clear canvas and draw space background
        this.ctx.fillStyle = '#0A192F';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid lines
        this.ctx.strokeStyle = 'rgba(100, 255, 218, 0.1)';
        this.ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let x = 0; x <= this.canvas.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.canvas.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }// Draw snake
        this.snake.forEach((segment, index) => {
            const gradient = this.ctx.createLinearGradient(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                (segment.x + 1) * this.gridSize,
                (segment.y + 1) * this.gridSize
            );
            
            if (index === 0) {
                // Head
                gradient.addColorStop(0, '#64FFDA');
                gradient.addColorStop(1, '#1CD6B9');
            } else {
                // Body
                gradient.addColorStop(0, '#BD93F9');
                gradient.addColorStop(1, '#64FFDA');
            }

            this.ctx.fillStyle = gradient;
            
            // Add glow effect
            this.ctx.shadowColor = '#64FFDA';
            this.ctx.shadowBlur = 10;
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });        // Draw food with space theme
        const foodGradient = this.ctx.createRadialGradient(
            (this.food.x + 0.5) * this.gridSize,
            (this.food.y + 0.5) * this.gridSize,
            2,
            (this.food.x + 0.5) * this.gridSize,
            (this.food.y + 0.5) * this.gridSize,
            this.gridSize / 2
        );
        foodGradient.addColorStop(0, '#FF79C6');
        foodGradient.addColorStop(1, '#BD93F9');
        
        // Add glow effect for food
        this.ctx.shadowColor = '#FF79C6';
        this.ctx.shadowBlur = 15;

        this.ctx.fillStyle = foodGradient;
        this.ctx.beginPath();
        this.ctx.arc(
            (this.food.x + 0.5) * this.gridSize,
            (this.food.y + 0.5) * this.gridSize,
            this.gridSize / 2 - 2,
            0,
            Math.PI * 2
        );
        this.ctx.fill();
    }

    gameOver() {
        this.isGameOver = true;
        clearInterval(this.gameLoop);
        this.gameLoop = null;
        
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snakeHighScore', this.highScore);
            this.updateScores();
        }
        
        this.finalScoreElement.textContent = this.score;
        this.gameOverlay.classList.add('active');
        this.startBtn.style.display = 'block';
    }

    updateScores() {
        this.scoreElement.textContent = this.score;
        this.highScoreElement.textContent = this.highScore;
    }
}

// Initialize game when page loads
window.addEventListener('load', () => {
    new SnakeGame();
});
