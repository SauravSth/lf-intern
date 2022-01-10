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
	if (ones > twos) result = 'Black Wins'
	else if (twos > ones) result = 'White Wins'
	else result = 'Draw'
	finalScore.innerHTML = `${result} <br>Black: ${ones} White: ${twos}`
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

// Draw canMoveLayer
function drawCanMoveLayer() {
	canMoveLayer.innerHTML = ''
	for (let row = 0; row < 8; row++) {
		for (let column = 0; column < 8; column++) {
			let value = discs[row][column]
			if (value == 0 && canClickSpot(turn, row, column)) {
				let discOutline = document.createElement('div')
				discOutline.style.position = 'absolute'
				discOutline.style.width = cellWidth - 5 + 'px'
				discOutline.style.height = cellWidth - 5 + 'px'
				discOutline.style.borderRadius = '50%'
				discOutline.style.left =
					(cellWidth + gap) * column + gap + 2 + 'px'
				discOutline.style.top = (cellWidth + gap) * row + gap + 2 + 'px'
				discOutline.style.zIndex = 1
				discOutline.setAttribute(
					'onClick',
					`clickedSquare(${row}, ${column})`
				)

				if (turn == 1) {
					discOutline.style.border = '2px solid black'
				}
				if (turn == 2) {
					discOutline.style.border = '2px solid white'
				}
				canMoveLayer.appendChild(discOutline)
			}
		}
	}
}
