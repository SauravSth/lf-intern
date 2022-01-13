// Functions
/**
 * @param {*} color
 * @returns div with style added of color
 */
const createBrickHtml = (color) => {
	return `<div class="flip-circle ${color}">
            <div class="flip-circle-inner">
              <div class="flip-circle-front">              
                
              </div>
              <div class="flip-circle-back">
                
              </div>
            </div>
          </div>`
}

/**
 *
 * @param {*} discs
 * @param {*} color
 * @returns The number of discs with specified color
 */
const getCount = (discs, color) => {
	return discs.filter((disc) => disc.children[0].classList.contains(color))
		.length
}

const updateScore = (discs, scoreDisplays) => {
	scoreDisplays[0].innerHTML = getCount(discs, 'black')
	scoreDisplays[1].innerHTML = getCount(discs, 'white')
}

const updateNextPlayerDisplay = (color) => {
	const opposingColor = color === 'black' ? 'white' : 'black'
	playerIndicator.classList.remove(opposingColor)
	playerIndicator.classList.add(color)
}

const updateDiscsFromBoard = (discs, board) => {
	discs.forEach((disc) => {
		const discX = disc.getAttribute('data-x')
		const discY = disc.getAttribute('data-y')
		const boardColor = board[discX][discY]
		if (boardColor.length) {
			const opposingColor = boardColor === 'black' ? 'white' : 'black'
			if (disc.children[0].classList.contains(opposingColor)) {
				disc.children[0].classList.remove(opposingColor)
				disc.children[0].classList.add(boardColor)
			}
		}
	})
}

/**
 *
 * @param {*} board . The board where discs are drawn
 * @param {*} discs
 * @param {*} positions . Positions of the individual discs
 * @param {*} target
 * @param {*} player
 * @param {*} x . X cordinate
 * @param {*} y . Y cordinate
 */
const placeBrick = (board, discs, positions, target, player, x, y) => {
	// Place brick
	target.innerHTML = createBrickHtml(player)
	// Flip bricks
	const flipDirections = positions.filter((pos) => pos.x == x && pos.y == y)
	flipDirections.forEach((flipDir) => {
		flipFromPos(board, player, flipDir)
	})
	board[x][y] = player
	updateDiscsFromBoard(discs, board)
}

const endGame = (discs) => {
	const blackCount = getCount(discs, 'black')
	const whiteCount = getCount(discs, 'white')
	if (blackCount === whiteCount) {
		console.log('Draw')
	}
	const winner = blackCount > whiteCount ? 'Black' : 'White'
	console.log(winner + ' wins!')
	discsWrapper.style.display = 'none'
	winScreen.style.display = 'block'
	winScreen.innerHTML = `<p style='margin-top: 40%;'>${winner}<br> Wins!</p>`
}

// Add empty discs to all 64 spaces of the board
const addDiscs = (board) => {
	let html = ''
	for (let i = 0; i < 64; i++) {
		html += `<div class="disc"></div>`
	}
	board.innerHTML = html
}
