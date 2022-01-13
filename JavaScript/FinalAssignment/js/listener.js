// Constants
const directions = [
	'up',
	'upright',
	'right',
	'downright',
	'down',
	'downleft',
	'left',
	'upleft',
]
const blankHtml = `<div class="blank"></div>`
// Variables
let noOfPlayers = 1

// Elements
const discsWrapper = document.querySelector('.board')
const scoreDisplays = [...document.querySelectorAll('.score')]
const startButton = document.querySelector('#start')
const playerIndicatorWrapper = document.querySelector('.indicator-circle')
playerIndicatorWrapper.innerHTML = createBrickHtml('black')
const playerIndicator = document.querySelector('.indicator-circle .flip-circle')
const noOfPlayersForm = document.querySelector('#no-of-players')
const winScreen = document.getElementById('winscreen')

// Event listeners
noOfPlayersForm.addEventListener('change', (e) => {
	noOfPlayers = e.target.value === 'single' ? 1 : 2
	startGame()
})
startButton.addEventListener('click', () => {
	startGame()
})
