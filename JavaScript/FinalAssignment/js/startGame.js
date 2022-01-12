// Start game function
const startGame = () => {
	discsWrapper.innerHTML = ''
	addDiscs(discsWrapper)
	const discs = [...document.querySelectorAll('.board .disc')]
	let currentPlayer = 'black'
	const board = [[], [], [], [], [], [], [], []]
	discs.forEach((disc) => {
		disc.innerHTML = blankHtml
	})

	// Initial discs
	discs[27].innerHTML = createBrickHtml('white')
	discs[28].innerHTML = createBrickHtml('black')
	discs[35].innerHTML = createBrickHtml('black')
	discs[36].innerHTML = createBrickHtml('white')

	// Initial score
	updateScore(discs, scoreDisplays)

	// Show starting player
	updateNextPlayerDisplay(currentPlayer)

	// Create board object
	discs.forEach((disc, index) => {
		const discX = index % 8
		const discY = Math.floor(index / 8)
		disc.setAttribute('data-x', discX)
		disc.setAttribute('data-y', discY)
		if (disc.children[0].classList.contains('black')) {
			board[discX][discY] = 'black'
		} else if (disc.children[0].classList.contains('white')) {
			board[discX][discY] = 'white'
		} else {
			board[discX][discY] = ''
		}
	})

	// Start first turn
	updateValidPositions(discs, board, currentPlayer)

	// Add click event
	discs.forEach((disc) => {
		disc.addEventListener('click', (e) => {
			const positions = getAvailablePositions(discs, board, currentPlayer)
			const discX = e.currentTarget.getAttribute('data-x')
			const discY = e.currentTarget.getAttribute('data-y')
			const posIsValid = positions.some(
				(pos) => pos.x == discX && pos.y == discY
			)
			// Make sure disc is empty and position is valid
			if (
				!e.currentTarget.children[0].classList.contains('black') &&
				!e.currentTarget.children[0].classList.contains('white') &&
				posIsValid
			) {
				placeBrick(
					board,
					discs,
					positions,
					e.currentTarget,
					currentPlayer,
					discX,
					discY
				)
				// Update score
				updateScore(discs, scoreDisplays)
				// Change player
				currentPlayer = currentPlayer === 'black' ? 'white' : 'black'
				// Show whos next
				updateNextPlayerDisplay(currentPlayer)
				// if single player
				if (noOfPlayers === 1) {
					// run the AI for the game
					clearValidPositions(discs)
					setTimeout(() => {
						const positions = getAvailablePositions(
							discs,
							board,
							currentPlayer
						)
						// No moves possible
						if (!positions.length) {
							endGame(discs)
							return
						}
						const sortedPositions = positions.sort(
							(p1, p2) => p2.flips - p1.flips
						)
						placeBrick(
							board,
							discs,
							positions,
							getDiscsFromCoordinate(discs, {
								x: sortedPositions[0].x,
								y: sortedPositions[0].y,
							}),
							currentPlayer,
							sortedPositions[0].x,
							sortedPositions[0].y
						)
						// Update score
						updateScore(discs, scoreDisplays)
						// Change player
						currentPlayer =
							currentPlayer === 'black' ? 'white' : 'black'
						// Show whos next
						updateNextPlayerDisplay(currentPlayer)
						// Show valid positions
						updateValidPositions(discs, board, currentPlayer)
					}, 1000)
				} else {
					// Show valid positions
					updateValidPositions(discs, board, currentPlayer)
				}
			}
		})
	})
}
