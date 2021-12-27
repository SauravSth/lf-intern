const viewport = document.getElementById('viewport')

const boundaryWidth = 300
const boundaryHeight = 300
const fps = 60

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min)
}
function ball() {
	this.ball = document.createElement('div')
	this.ball.classList.add('ball')
	this.ball.style.width = '20px'
	this.ball.style.height = '20px'

	this.x = getRandomInt(0, boundaryWidth)
	this.y = getRandomInt(0, boundaryHeight)

	this.dx = 1
	this.dy = 2

	this.ball.style.top = this.y + 'px'
	this.ball.style.top = this.x + 'px'
	this.ball.style.position = 'absolute'

	this.draw = function () {
		viewport.appendChild(this.ball)
	}

	this.move = function () {
		setInterval(() => {
			this.x += this.speed * dx
			this.y += this.speed * dy
			this.ball.style.top = this.y + 'px'
			this.ball.style.left = this.x + 'px'

			this.ball.checkWallCollission()
		}, 1000 / fps)

		// requestAnimationFrame(() => {
		//     this.move();
		// })
	}
	this.checkWallCollission = function () {
		if (this.x > boundaryWidth) {
			dx = -1
		}
		if (this.y > boundaryHeight) {
			dy = -1
		}
		if (this.x < 0) {
			this.dx = 1
		}
		if (this.y < 0) {
			this.dy = 1
		}
	}
	this.checkBallCollission = function () {
		ballArray.forEach((ball) => {
			if (ball !== this.ball) {
			}
		})
	}
}

const ballCount = 5
const ballArray = []

document.getElementById('btn').onclick = function () {
	viewport.innerHTML = ''
	for (let i = 0; i < 5; i++) {
		const ball = new ball()
		ballArray.push(ball)
		ball.draw()
		ball.move()
	}
}
