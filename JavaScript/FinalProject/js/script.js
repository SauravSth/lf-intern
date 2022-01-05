const startDiv = document.getElementById('start')
const startVsPlayerBtn = document.getElementById('vs-player')
const startVsComputerBtn = document.getElementById('vs-AI')
const mainContainer = document.getElementById('main-container')
const mainBody = document.getElementById('body')
const discLayer = document.getElementById('discLayer')

// Declare variables
let gap = 3
let cellWidth = 70
let turn = 1

// Initial status of discs
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

// Event listener for starting game of Player vs Player
startVsPlayerBtn.addEventListener('click', () => {
	mainContainer.style.display = 'block'
	startDiv.style.display = 'none'
	mainBody.style.width = cellWidth * 8 + gap * 9 + 'px'
	mainBody.style.height = cellWidth * 8 + gap * 9 + 'px'

	drawGreenSquares()
	drawDiscs()
})

// Draw background squares
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

// Check if square was clicked and if the clicked square is valid
function clickedSquare(row, column) {
	if (discs[row][column] != 0) {
		return
	}
	if (canClickSpot(row, column) == true) {
		let affectedDiscs = getAffectedDiscs(row, column)

		flipDiscs(affectedDiscs)
		discs[row][column] = turn
		if (turn == 1) turn = 2
		else turn = 1
		drawDiscs()
	}
}

// Check if the clicked square is a valid move or not
function canClickSpot(row, column) {
	let affectedDiscs = getAffectedDiscs(row, column)
	if (affectedDiscs.length == 0) return false
	else return true
}

// Get all discs that might be affected by a certain move
function getAffectedDiscs(row, column) {
	let affectedDiscs = []
	let couldBeAffected = []
	let columnIterator = column
	while (columnIterator < 7) {
		columnIterator += 1
		let valueAtSpot = discs[row][columnIterator]
		if (valueAtSpot == 0 || valueAtSpot == turn) {
			if (valueAtSpot == turn) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: row, column: columnIterator }
			couldBeAffected.push(discLocation)
		}
	}
	return affectedDiscs
}

// Flip discs after a valid move
function flipDiscs(affectedDiscs) {
	for (let i = 0; i < affectedDiscs.length; i++) {
		let spot = affectedDiscs[i]
		if (discs[spot.row][spot.column] == 1) {
			discs[spot.row][spot.column] = 2
		} else {
			discs[spot.row][spot.column] = 1
		}
	}
}

// Draw initial discs
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
