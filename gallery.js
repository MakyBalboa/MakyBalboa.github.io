const carousels = document.querySelectorAll(".carousel");

carousels.forEach(carousel => {

    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".slide");

    let currentIndex = 0;

    let isDragging = false;

    let startX = 0;
    let dragDistance = 0;

    track.style.transition = "none";
    track.style.transform = "translateX(0px)";

    const dots = document.createElement("div");
    dots.classList.add("carousel-dots");

    function resizeCarousel() {
	const maxWidth = carousel.offsetWidth * 0.96;

	let widestImage = 0;

	slides.forEach(slide => {
	    const img = slide.querySelector("img");

	    const width =
		img.naturalWidth / img.naturalHeight;

	    if (width > widestImage) {
		widestImage = width;
	    }
	});

	const height = maxWidth / widestImage;

	carousel.style.setProperty(
	    "--carousel-height",
	    `${height}px`
	);

	moveToSlide(currentIndex, false);
    }

    slides.forEach((slide, index) => {

	const dot = document.createElement("button");

	dot.classList.add("carousel-dot");

	if (index === 0) {
	    dot.classList.add("active");
	}

	dot.addEventListener("click", () => {
	    currentIndex = index;
	    moveToSlide(currentIndex);

	    updateDots();
	});

	dots.appendChild(dot);
    });

    carousel.after(dots);

    function updateDots() {

	const allDots =
	    dots.querySelectorAll(".carousel-dot");

	allDots.forEach((dot, index) => {
	    dot.classList.toggle(
		"active",
		index === currentIndex
	    );
	});
    }

    function moveToSlide(index, smooth = true) {

	const slide = slides[index];

	const slideCenter =
	    slide.offsetLeft + slide.offsetWidth / 2;

	const carouselCenter =
	    carousel.offsetWidth / 2;

	const position =
	    carouselCenter - slideCenter;

	track.style.transition = smooth
	    ? "transform 0.4s ease"
	    : "none";

	track.style.transform =
	    `translateX(${position}px)`;

	updateDots();
    }


    carousel.addEventListener("pointerdown", e => {

	isDragging = true;

	startX = e.clientX;

	const slide = slides[currentIndex];

	const slideCenter =
	    slide.offsetLeft + slide.offsetWidth / 2;

	const carouselCenter =
	    carousel.offsetWidth / 2;

	startPosition =
	    carouselCenter - slideCenter;

	track.style.transition = "none";

	carousel.classList.add("dragging");

	carousel.setPointerCapture(e.pointerId);
    });


    carousel.addEventListener("pointermove", e => {

	if (!isDragging) return;

	dragDistance = e.clientX - startX;

	let position =
	    startPosition + dragDistance;


	// At the first slide
	if (currentIndex === 0 && dragDistance > 0) {
	    position =
		startPosition + dragDistance * 0.10;
	}


	// At the last slide
	if (
	    currentIndex === slides.length - 1 &&
	    dragDistance < 0
	) {
	    position =
		startPosition + dragDistance * 0.10;
	}


	track.style.transform =
	    `translateX(${position}px)`;
    });


    carousel.addEventListener("pointerup", e => {

        if (!isDragging) return;

        isDragging = false;

        carousel.classList.remove("dragging");

        const threshold = 100;


        if (
            dragDistance < -threshold &&
            currentIndex < slides.length - 1
        ) {
            currentIndex++;
        }

        else if (
            dragDistance > threshold &&
            currentIndex > 0
        ) {
            currentIndex--;
        }


        moveToSlide(currentIndex);


        dragDistance = 0;
    });


    carousel.addEventListener("pointercancel", () => {

        if (!isDragging) return;

        isDragging = false;

        carousel.classList.remove("dragging");

        moveToSlide(currentIndex);

        dragDistance = 0;
    });

    slides.forEach(slide => {
	const img = slide.querySelector("img");

	if (img.complete) {
	    resizeCarousel();
	} else {
	    img.addEventListener("load", resizeCarousel);
	}
    });

    moveToSlide(currentIndex, false);
    carousel.classList.add("ready");

});


