let endScreen = document.querySelector('.end-screen')
let startScreen = document.querySelector('.start-screen')
let endScreenStrong = document.querySelectorAll('.end-screen strong')
let startBtn = document.querySelector('#start-btn')
let restartBtn = document.querySelector('#restart-btn')
let gameScore = document.querySelector('.score h2')
let obtainedScore = document.querySelector('.obtained-score')

function gameOver() {
	endScreen.style.display = 'flex'
	endScreenStrong.forEach((element) => {
		element.innerText = score
	})
	obtainedScore.style.display = 'block'
}

function init() {
	drawRoadAndPlayer()

	const opponent1 = new Opponent(-100)
	const opponent2 = new Opponent(-550)
	const opponent3 = new Opponent(-1000)

	opponent1.drawOpponentCar()
	opponent2.drawOpponentCar()
	opponent3.drawOpponentCar()
}

startBtn.addEventListener('click', () => {
	inactive = false
	init()
	startScreen.style.display = 'none'
})

restartBtn.addEventListener('click', () => {
	inactive = false
	score = 0
	playerCarX = 280
	gameScore.innerText = score

	init()
	endScreen.style.display = 'none'
})
