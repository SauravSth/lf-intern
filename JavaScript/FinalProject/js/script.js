const startDiv = document.getElementById('start')
const startVsPlayerBtn = document.getElementById('vs-player')
const startVsComputerBtn = document.getElementById('vs-AI')
const mainContainer = document.getElementById('main-container')
const mainBody = document.getElementById('body')
const discLayer = document.getElementById('discLayer')

let gap = 3
let cellWidth = 70
let turn = 1

let discs = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 2, 1, 0, 0, 0],
	[0, 0, 0, 1, 2, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
]

startVsPlayerBtn.addEventListener('click', () => {
	mainContainer.style.display = 'block'
	startDiv.style.display = 'none'
	mainBody.style.width = cellWidth * 8 + gap * 9 + 'px'
	mainBody.style.height = cellWidth * 8 + gap * 9 + 'px'

	drawGreenSquares()
	drawDiscs()
})

function drawGreenSquares() {
	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			let greenSquare = document.createElement('div')
			greenSquare.style.position = 'absolute'
			greenSquare.style.width = cellWidth + 'px'
			greenSquare.style.height = cellWidth + 'px'
			greenSquare.style.backgroundColor = 'green'
			greenSquare.style.left = (cellWidth + gap) * column + gap + 'px'
			greenSquare.style.top = (cellWidth + gap) * row + gap + 'px'
			greenSquare.setAttribute(
				'onClick',
				`clickedSquare(${row}, ${column})`
			)

			body.appendChild(greenSquare)
		}
	}
}

function clickedSquare(row, column) {
	discs[row][column] = turn
	if (turn == 1) turn = 2
	else turn = 1
	drawDiscs()
}

function drawDiscs() {
	discLayer.innerHTML = ''
	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			let value = discs[row][column]
			if (value == 0) {
			} else {
				let disc = document.createElement('div')
				disc.style.position = 'absolute'
				disc.style.width = cellWidth - 4 + 'px'
				disc.style.height = cellWidth - 4 + 'px'
				disc.style.borderRadius = '50%'
				disc.style.left = (cellWidth + gap) * column + gap + 2 + 'px'
				disc.style.top = (cellWidth + gap) * row + gap + 2 + 'px'
				disc.style.zIndex = 1

				if (value == 1) {
					disc.style.backgroundColor = 'black'
				}
				if (value == 2) {
					disc.style.backgroundColor = 'white'
				}

				discLayer.appendChild(disc)
			}
		}
	}
}
