class ImageSlider {
	// Setting the initial values
	constructor(carouselContainer, transition, hold) {
		this.carouselContainer = carouselContainer
		this.carouselWrapper = carouselContainer.children[0]

		this.images = this.carouselWrapper.children
		this.imageCount = this.images.length
		this.imgWidth = this.images[0].clientWidth
		this.imgHeight = this.images[0].clientHeight

		this.carouselWrapper.style.width =
			this.imageCount * this.imgWidth + 'px'
		this.carouselWrapper.style.height = this.imgHeight + 'px'

		this.carouselContainer.style.width = this.imgWidth + 'px'

		this.carouselContainer.style.position = 'relative'
		this.carouselWrapper.style.position = 'relative'
		this.carouselContainer.style.overflow = 'hidden'

		this.index = 0
		this.prevIndex = -1
		this.lastIndex = this.imageCount - 1
		this.shifting = 0
		this.change = 5

		this.imgCounter = []
		this.transition = transition
		this.hold = hold
		this.transistionInterval =
			this.transition / (this.imgWidth / this.change)

		this.display()
	}
	// Setting the height of the carousel to be displayed
	positionImages() {
		for (let i = 0; i < this.imageCount; i++) {
			this.images[i].style.position = 'absolute'
			this.images[i].style.width = this.imgWidth + 'px'
			this.images[i].style.height = this.imgHeight + 'px'
			this.images[i].style.left = i * this.imgWidth + 'px'
		}
	}

	// Function for switching to previous image
	prevImage() {
		this.prevIndex = this.index
		this.index--
		if (this.index < 0) {
			this.index = this.lastIndex
		}
		let animation = setInterval(() => {
			this.shifting += this.change
			if (this.shifting > this.imgWidth) {
				clearInterval(animation)
				this.shifting = 0
			} else {
				if (this.prevIndex === 0) {
					this.carouselWrapper.style.left = `${
						-this.prevIndex * this.imgWidth -
						this.lastIndex * this.shifting
					}px`
				} else {
					this.carouselWrapper.style.left = `${
						-this.prevIndex * this.imgWidth + this.shifting
					}px`
				}
			}
		}, this.transistionInterval)
	}

	// Function for switching to next image
	nextImage() {
		this.prevIndex = this.index
		this.index++
		if (this.index >= this.imageCount) {
			this.index = 0
		}
		let animation = setInterval(() => {
			this.shifting += this.change
			if (this.shifting > this.imgWidth) {
				clearInterval(animation)
				this.shifting = 0
			} else {
				if (this.prevIndex === this.lastIndex) {
					this.carouselWrapper.style.left = `${
						-this.prevIndex * this.imgWidth +
						this.lastIndex * this.shifting
					}px`
				} else {
					this.carouselWrapper.style.left = `${
						-this.prevIndex * this.imgWidth - this.shifting
					}px`
				}
			}
		}, this.transistionInterval)
	}

	// Creating left arrow element
	createLeftArrow() {
		let LeftArrow = document.createElement('button')

		LeftArrow.setAttribute('class', 'left-arrow')
		this.carouselContainer.appendChild(LeftArrow)

		LeftArrow.onclick = this.prevImage.bind(this)
	}

	// Creating right arrow element
	createRightArrow() {
		let RightArrow = document.createElement('button')
		RightArrow.setAttribute('class', 'right-arrow')
		this.carouselContainer.appendChild(RightArrow)

		RightArrow.onclick = this.nextImage.bind(this)
	}

	// Creating image Counter element
	createCounter() {
		let imgCounterContainer = document.createElement('div')
		imgCounterContainer.setAttribute('class', 'img-counter-container')
		this.carouselContainer.appendChild(imgCounterContainer)

		for (let i = 0; i < this.imageCount; i++) {
			let counter = document.createElement('div')
			this.imgCounter.push(counter)

			counter.setAttribute('class', 'counter')
			imgCounterContainer.appendChild(counter)

			// Onclick function for the counter
			counter.onclick = () => {
				if (this.index !== i) {
					this.prevIndex = this.index
					this.index = i
					let animation = setInterval(() => {
						this.shifting += this.change
						if (this.shifting > this.imgWidth) {
							clearInterval(animation)
							this.shifting = 0
						} else {
							this.carouselWrapper.style.left = `${
								-this.prevIndex * this.imgWidth -
								(this.index - this.prevIndex) * this.shifting
							}px`
						}
					}, this.transistionInterval)
				}
			}
		}
	}

	setCounterBackground() {
		setInterval(() => {
			this.imgCounter[this.index].style.background = '#49c'
			if (this.prevIndex !== -1) {
				this.imgCounter[this.prevIndex].style.background = 'white'
			}
		}, 10)
	}

	// Function for the auto sliding feature
	autoSlide() {
		this.autoTransistion = setInterval(
			this.nextImage.bind(this),
			this.hold + this.transition
		)
	}

	// Running the functions of different features
	display() {
		this.positionImages()
		this.createLeftArrow()
		this.createRightArrow()
		this.createCounter()
		this.setCounterBackground()
		this.autoSlide()
	}
}

let imageSlider1 = new ImageSlider(
	document.querySelectorAll('.carousel-container')[0],
	1000,
	2000
)

let imageSlider2 = new ImageSlider(
	document.querySelectorAll('.carousel-container')[1],
	4000,
	2000
)
let imageSlider3 = new ImageSlider(
	document.querySelectorAll('.carousel-container')[2],
	500,
	3000
)
