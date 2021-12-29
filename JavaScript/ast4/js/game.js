const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.height = 798
canvas.width = 800

/**
 * Game Constants
 */
let score = 0
let xPosArray = [30, 280, 550]
let speed = 5
let inactive = true
let playerCarX = 280
let playerCarY = 600

class Opponent {
	constructor(y) {
		this.x = getRandomElement(xPosArray)
		this.y = y
		this.prevY = this.y
		this.speed = speed
	}

	detectCollision = () => {
		if (this.x === playerCarX && Math.abs(playerCarY - this.y) <= 179) {
			gameOver()
			inactive = true

			return
		}
	}

	drawOpponentCar = () => {
		const opponent = new Image()
		opponent.src = 'images/opponent-car.png'
		opponent.onload = () => {
			const moveOpponent = () => {
				c.drawImage(opponent, this.x, this.y)
				this.y += speed

				if (this.y > canvas.height + 5) {
					this.y = -400
					this.x = getRandomElement(xPosArray)
					score++
					gameScore.innerText = score
					// if (speed < 50) {
					// 	speed += 0.1
					// 	this.speed = speed / 2
					// }
				}
				this.detectCollision()

				if (inactive) return
				requestAnimationFrame(moveOpponent)
			}

			moveOpponent()
		}
	}
}

function drawRoad() {
	const road = new Image()
	road.src = 'images/road-img.png'

	road.onload = () => {
		let y = 0
		const moveRoad = () => {
			c.drawImage(
				road,
				0,
				y - canvas.height,
				canvas.width,
				canvas.height * 2
			)
			y += speed
			if (y >= canvas.height) y = 0

			if (inactive) return
			requestAnimationFrame(moveRoad)
		}
		moveRoad()
	}
}

function drawPlayerCar() {
	const playerCar = new Image()
	playerCar.src = 'images/player-car.png'

	const drawPlayer = () => {
		c.drawImage(playerCar, playerCarX, playerCarY)

		if (inactive) return
		requestAnimationFrame(drawPlayer)
	}

	playerCar.onload = () => {
		drawPlayer()
	}
}

function drawRoadAndPlayer() {
	drawRoad()
	drawPlayerCar()
}

document.addEventListener('keydown', (event) => {
	if (event.code === 'ArrowLeft' && playerCarX > 60) playerCarX -= 250

	if (event.code === 'ArrowRight' && playerCarX < 760) playerCarX += 250
})

function getRandomElement(arr) {
	let randomIndex = Math.floor(arr.length * Math.random())
	return arr[randomIndex]
}
