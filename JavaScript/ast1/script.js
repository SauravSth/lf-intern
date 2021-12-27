const carouselContainer = document.querySelector('.carousel-container')
const carouselWrapper = document.querySelector('.carousel-image-wrapper')

const images = document.querySelectorAll('.carousel-image-wrapper img')
const imageCount = images.length
const imgWidth = images[0].clientWidth

carouselContainer.style.width = imgWidth + 'px'

carouselWrapper.style.width = `${imageCount * imgWidth}px`

for (let i = 0; i < imageCount; i++) {
	images[i].style.left = i * imgWidth + 'px'
}

let index = 0
let prevIndex = -1
let shifting = 0

// Function for changing to next image
function nextImage() {
	prevIndex = index
	index++
	if (index >= imageCount) {
		index = 0
	}
	let animate = setInterval(() => {
		shifting += 5
		if (shifting > imgWidth) {
			clearInterval(animate)
			shifting = 0
		} else {
			if (prevIndex === imageCount - 1) {
				carouselWrapper.style.left = `${
					-prevIndex * imgWidth + (imageCount - 1) * shifting
				}px`
			} else {
				carouselWrapper.style.left = `${
					-prevIndex * imgWidth - shifting
				}px`
			}
		}
	}, 5)
}

// Function for changing to previous image
function previousImage() {
	prevIndex = index
	index--
	if (index < 0) {
		index = imageCount - 1
	}
	let animate = setInterval(() => {
		shifting += 5
		if (shifting > imgWidth) {
			clearInterval(animate)
			shifting = 0
		} else {
			if (prevIndex === 0) {
				carouselWrapper.style.left = `${
					-prevIndex * imgWidth - (imageCount - 1) * shifting
				}px`
			} else {
				carouselWrapper.style.left = `${
					-prevIndex * imgWidth + shifting
				}px`
			}
		}
	}, 5)
}

// Creating leftArrow element
const leftArrow = document.createElement('button')
leftArrow.setAttribute('class', 'left-arrow')
carouselContainer.appendChild(leftArrow)

// Creating rightArrow element
const rightArrow = document.createElement('button')
rightArrow.setAttribute('class', 'right-arrow')
carouselContainer.appendChild(rightArrow)

rightArrow.onclick = nextImage
leftArrow.onclick = previousImage

const imgCounter = []
const imgCounterContainer = document.createElement('div')
imgCounterContainer.setAttribute('class', 'img-counter-container')
carouselContainer.appendChild(imgCounterContainer)

for (let i = 0; i < imageCount; i++) {
	const counter = document.createElement('div')
	imgCounter.push(counter)
	counter.setAttribute('class', 'counter')
	imgCounterContainer.appendChild(counter)

	counter.onclick = function () {
		if (index !== i) {
			prevIndex = index
			index = i
			let animate = setInterval(() => {
				shifting += 5
				if (shifting > imgWidth) {
					clearInterval(animate)
					shifting = 0
				} else {
					carouselWrapper.style.left = `${
						-prevIndex * imgWidth - (index - prevIndex) * shifting
					}px`
				}
			}, 5)
		}
	}
}

setInterval(() => {
	imgCounter[index].style.background = '#49c'
	if (prevIndex !== -1) {
		imgCounter[prevIndex].style.background = '#eee1f7'
	}
}, 10)
