const getAvailablePositions = (discs, board, color) => {
	const positions = []
	discs.forEach((disc, index) => {
		if (
			disc.children[0].classList.contains('black') ||
			disc.children[0].classList.contains('white')
		) {
			return
		}
		const discX = index % 8
		const discY = Math.floor(index / 8)
		directions.forEach((direction) => {
			const discsInDir = getDiscsInDirection(
				{ x: discX, y: discY },
				direction,
				board,
				color
			)
			const flips = willCauseFlipsCount(discsInDir)
			if (flips > 0) {
				positions.push({
					x: discX,
					y: discY,
					direction,
					flips,
				})
			}
		})
	})
	return positions
}

const willCauseFlipsCount = (discs) => {
	if (discs.length < 3) {
		return 0
	}
	let hasResult = false
	let result = 0
	const myColor = discs[0]
	const opposingColor = myColor === 'black' ? 'white' : 'black'
	discs.forEach((disc, index) => {
		if (!hasResult) {
			if (index >= 1 && disc === opposingColor) {
				result++
			}
			if (index === 1 && disc !== opposingColor) {
				hasResult = true
				result = 0
			}
			if (index > 1 && disc === '') {
				hasResult = true
				result = 0
			}
			if (index > 1 && disc === myColor) {
				hasResult = true
			}
		}
	})
	// No opposing color brick encountered
	if (!hasResult) {
		result = 0
	}
	return result
}

const getDiscsInDirection = (pos, dir, _board, color) => {
	const board = _board.map(function (row) {
		return row.slice()
	})
	const discs = []
	let x = pos.x
	let y = pos.y
	board[x][y] = color
	switch (dir) {
		case 'up':
			for (y; y >= 0; y--) {
				discs.push(board[x][y])
			}
			break
		case 'upright':
			while (x <= 7 && y >= 0) {
				discs.push(board[x][y])
				x++
				y--
			}
			break
		case 'right':
			for (x; x <= 7; x++) {
				discs.push(board[x][y])
			}
			break
		case 'downright':
			while (x <= 7 && y <= 7) {
				discs.push(board[x][y])
				x++
				y++
			}
			break
		case 'down':
			for (y; y <= 7; y++) {
				discs.push(board[x][y])
			}
			break
		case 'downleft':
			while (x >= 0 && y <= 7) {
				discs.push(board[x][y])
				x--
				y++
			}
			break
		case 'left':
			for (x; x >= 0; x--) {
				discs.push(board[x][y])
			}
			break
		case 'upleft':
			while (x >= 0 && y >= 0) {
				discs.push(board[x][y])
				x--
				y--
			}
			break
		default:
			break
	}
	return discs
}

const getDiscsFromCoordinate = (discs, pos) => {
	return discs[pos.y * 8 + pos.x]
}
const clearValidPositions = (discs) => {
	discs.forEach((disc) => {
		disc.classList.remove('valid')
	})
}

const updateValidPositions = (discs, board, color) => {
	discs.forEach((disc) => {
		disc.classList.remove('valid')
	})
	const validPositions = getAvailablePositions(discs, board, color)
	if (!validPositions.length) {
		endGame(discs)
	}
	// Show avalible positions
	validPositions.forEach((pos) => {
		const disc = getDiscsFromCoordinate(discs, pos)
		disc.classList.add('valid')
	})
}

const flipFromPos = (board, color, pos) => {
	const opposingColor = color === 'black' ? 'white' : 'black'
	let x = pos.x
	let y = pos.y
	switch (pos.direction) {
		case 'up':
			y--
			for (y; y > 0; y--) {
				if (board[x][y] === opposingColor) {
					board[x][y] = color
				} else {
					break
				}
			}
			break
		case 'upright':
			x++
			y--
			while (x <= 7 && y >= 0) {
				if (board[x][y] === opposingColor) {
					board[x][y] = color
				} else {
					break
				}
				x++
				y--
			}
			break
		case 'right':
			x++
			for (x; x <= 7; x++) {
				if (board[x][y] === opposingColor) {
					board[x][y] = color
				} else {
					break
				}
			}
			break
		case 'downright':
			x++
			y++
			while (x <= 7 && y <= 7) {
				if (board[x][y] === opposingColor) {
					board[x][y] = color
				} else {
					break
				}
				x++
				y++
			}
			break
		case 'down':
			y++
			for (y; y <= 7; y++) {
				if (board[x][y] === opposingColor) {
					board[x][y] = color
				} else {
					break
				}
			}
			break
		case 'downleft':
			x--
			y++
			while (x >= 0 && y <= 7) {
				if (board[x][y] === opposingColor) {
					board[x][y] = color
				} else {
					break
				}
				x--
				y++
			}
			break
		case 'left':
			x--
			for (x; x >= 0; x--) {
				if (board[x][y] === opposingColor) {
					board[x][y] = color
				} else {
					break
				}
			}
			break
		case 'upleft':
			x--
			y--
			while (x >= 0 && y >= 0) {
				if (board[x][y] === opposingColor) {
					board[x][y] = color
				} else {
					break
				}
				x--
				y--
			}
			break
		default:
			break
	}
}
