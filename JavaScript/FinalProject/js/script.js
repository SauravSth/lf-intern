// Declare variables
let gap = 3
let cellWidth = 70
let turn = 1
let gameOver = false

// Initial status of discs
// Black discs are denoted by 1 and White discs are denoted by 2
let discs = [
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 1, 1, 0, 0, 0],
	[0, 0, 0, 2, 1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
]

function init() {
	mainContainer.style.display = 'block'
	startDiv.style.display = 'none'
	mainBody.style.width = cellWidth * 8 + gap * 9 + 'px'
	mainBody.style.height = cellWidth * 8 + gap * 9 + 'px'

	drawGreenSquares()
	drawDiscs()
	drawCanMoveLayer()
}
// Event listener for starting game of Player vs Player
startVsPlayerBtn.addEventListener('click', () => {
	init()
})

// Restart button event listener
restartBtn.addEventListener('click', () => {
	window.location.href =
		'http://127.0.0.1:5500/Internship/JavaScript/FinalProject/index.html'
})

// Check if square was clicked and if the clicked square is valid
function clickedSquare(row, column) {
	if (gameOver) {
		mainContainer.style.display = 'none'
		mainBody.style.display = 'none'
		endScreen.style.display = 'block'
		return
	}
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
			console.log('GameOver')
			gameOver = true
		}

		drawDiscs()
		drawCanMoveLayer()
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

// Check if the clicked square is a valid move or not
function canClickSpot(id, row, column) {
	let affectedDiscs = getAffectedDiscs(id, row, column)
	if (affectedDiscs.length == 0) return false
	else return true
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
