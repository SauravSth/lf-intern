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
