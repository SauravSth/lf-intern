// Functions

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
		alert('Draw')
	}
	const winner = blackCount > whiteCount ? 'Black' : 'White'
	alert(winner + ' wins!')
	startGame()
}

const addDiscs = (board) => {
	let html = ''
	for (let i = 0; i < 64; i++) {
		html += `<div class="disc"></div>`
	}
	board.innerHTML = html
}
