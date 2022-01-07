const startDiv = document.getElementById('start')
const startVsPlayerBtn = document.getElementById('vs-player')
const startVsComputerBtn = document.getElementById('vs-AI')
const mainContainer = document.getElementById('main-container')
const mainBody = document.getElementById('body')
const discLayer = document.getElementById('discLayer')
const score = document.getElementById('score')

// Declare variables
let gap = 3
let cellWidth = 70
let turn = 1
let gameOver = false

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
	if (gameOver) return
	if (discs[row][column] != 0) {
		return
	}
	if (canClickSpot(turn, row, column) == true) {
		let affectedDiscs = getAffectedDiscs(turn, row, column)

		flipDiscs(affectedDiscs)
		discs[row][column] = turn
		if (turn == 1 && canMove(2)) turn = 2
		else if (turn == 2 && canMove(1)) turn = 1

		if (canMove(1) == false && canMove(2) == false) {
			alert('Game Over')
			gameOver = true
		}

		drawDiscs()
		drawScore()
	}
}

function canMove(id) {
	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			if (canClickSpot(id, row, column)) {
				return true
			}
		}
	}
	return false
}

function drawScore() {
	let ones = 0
	let twos = 0

	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			let value = discs[row][column]
			if (value == 1) ones += 1
			else if (value == 2) twos += 1
		}
	}
	score.textContent = `Black: ${ones} White: ${twos}`
}

// Check if the clicked square is a valid move or not
function canClickSpot(id, row, column) {
	let affectedDiscs = getAffectedDiscs(id, row, column)
	if (affectedDiscs.length == 0) return false
	else return true
}

// Get all discs that might be affected by a certain move

function getAffectedDiscs(id, row, column) {
	let affectedDiscs = []
	let couldBeAffected = []
	let columnIterator = column
	let rowIterator = row

	// Check if disc to the right needs to be flipped

	while (columnIterator < 7) {
		columnIterator += 1
		let valueAtSpot = discs[row][columnIterator]
		if (valueAtSpot == 0 || valueAtSpot == id) {
			if (valueAtSpot == id) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: row, column: columnIterator }
			couldBeAffected.push(discLocation)
		}
	}

	// Check if above disc to the left needs to be flipped

	couldBeAffected = []
	columnIterator = column
	while (columnIterator > 0) {
		columnIterator -= 1
		let valueAtSpot = discs[row][columnIterator]
		if (valueAtSpot == 0 || valueAtSpot == id) {
			if (valueAtSpot == id) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: row, column: columnIterator }
			couldBeAffected.push(discLocation)
		}
	}

	// Check if disc above needs to be flipped
	couldBeAffected = []
	rowIterator = row
	while (rowIterator > 0) {
		rowIterator -= 1
		let valueAtSpot = discs[rowIterator][column]
		if (valueAtSpot == 0 || valueAtSpot == id) {
			if (valueAtSpot == id) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: rowIterator, column: column }
			couldBeAffected.push(discLocation)
		}
	}

	// Check if disc below needs to be flipped
	couldBeAffected = []
	rowIterator = row
	while (rowIterator < 7) {
		rowIterator += 1
		let valueAtSpot = discs[rowIterator][column]
		if (valueAtSpot == 0 || valueAtSpot == id) {
			if (valueAtSpot == id) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: rowIterator, column: column }
			couldBeAffected.push(discLocation)
		}
	}

	// Check if disc down left needs to be flipped
	couldBeAffected = []
	rowIterator = row
	columnIterator = column
	while (rowIterator < 7 && columnIterator < 7) {
		rowIterator += 1
		columnIterator += 1
		let valueAtSpot = discs[rowIterator][columnIterator]
		if (valueAtSpot == 0 || valueAtSpot == id) {
			if (valueAtSpot == id) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: rowIterator, column: columnIterator }
			couldBeAffected.push(discLocation)
		}
	}

	// Check if disc down right needs to be flipped
	couldBeAffected = []
	rowIterator = row
	columnIterator = column
	while (rowIterator < 7 && columnIterator > 0) {
		rowIterator += 1
		columnIterator -= 1
		let valueAtSpot = discs[rowIterator][columnIterator]
		if (valueAtSpot == 0 || valueAtSpot == id) {
			if (valueAtSpot == id) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: rowIterator, column: columnIterator }
			couldBeAffected.push(discLocation)
		}
	}

	// Check if disc up left needs to be flipped
	couldBeAffected = []
	rowIterator = row
	columnIterator = column
	while (rowIterator > 0 && columnIterator > 0) {
		rowIterator -= 1
		columnIterator -= 1
		let valueAtSpot = discs[rowIterator][columnIterator]
		if (valueAtSpot == 0 || valueAtSpot == id) {
			if (valueAtSpot == id) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: rowIterator, column: columnIterator }
			couldBeAffected.push(discLocation)
		}
	}

	// Check if disc up right needs to be flipped
	couldBeAffected = []
	rowIterator = row
	columnIterator = column
	while (rowIterator > 0 && columnIterator < 7) {
		rowIterator -= 1
		columnIterator += 1
		let valueAtSpot = discs[rowIterator][columnIterator]
		if (valueAtSpot == 0 || valueAtSpot == id) {
			if (valueAtSpot == id) {
				affectedDiscs = affectedDiscs.concat(couldBeAffected)
			}
			break
		} else {
			let discLocation = { row: rowIterator, column: columnIterator }
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
