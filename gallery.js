
let ScrollFrames = document.getElementsByClassName("Scroll-Frame")
let IsDragging = false

let mouseX = 0
let mouseY = 0

let startX = 0
let startScrollLeft = 0

for(let i = 0; i < ScrollFrames.length; i++){

    //console.log(i)
    
    ScrollFrames[i].addEventListener("mousemove", function(e){
        if(!IsDragging) return;
        ScrollFrames[i].scrollLeft += mouseX - e.pageX
        mouseX = e.pageX
    })

    ScrollFrames[i].addEventListener("mousedown", function(e){
        IsDragging = true
        mouseX = e.pageX
        startX = e.pageX
        startScrollLeft = ScrollFrames[i].scrollLeft
        ScrollFrames[i].classList.add("Dragging")
    })

    ScrollFrames[i].addEventListener("mouseup", function(e){
        IsDragging = false
        ScrollFrames[i].classList.remove("Dragging")

        ValidateFramePosition(ScrollFrames[i], e)

        startX = 0
    })

    ScrollFrames[i].addEventListener("mouseleave", function(e){
        IsDragging = false
        ScrollFrames[i].classList.remove("Dragging")

        ValidateFramePosition(ScrollFrames[i], e)

        startX = 0
    })
    
    ScrollFrames[i].addEventListener("touchstart", function(e){
        IsDragging = true
        mouseX = e.touches[0].clientX
        startX = e.touches[0].clientX
        startScrollLeft = ScrollFrames[i].scrollLeft
        ScrollFrames[i].classList.add("Dragging")
    })

    ScrollFrames[i].addEventListener("touchend", function(e){
        IsDragging = false
        ScrollFrames[i].classList.remove("Dragging")

        console.log(startScrollLeft)

        if(startScrollLeft != ScrollFrames[i].scrollLeft){
            startX = 0
            return
        }

        if((startX - e.touches[0].clientX) > 100){
            ScrollFrames[i].scrollLeft += 500
        }
        if((startX - e.touches[0].clientX) < -100){
            ScrollFrames[i].scrollLeft -= 500
        }

        startX = 0
    })

    ScrollFrames[i].addEventListener("touchmove", function(e){
        if(!IsDragging) return;
        ScrollFrames[i].scrollLeft += mouseX - e.touches[0].clientX
        mouseX = e.touches[0].clientX
    })

}

function ValidateFramePosition(frame, event){
    if(startScrollLeft != frame.scrollLeft){
        startX = 0
        return
    }

    if((startX - event.pageX) > 100){
        frame.scrollLeft += 500
    }
    if((startX - event.pageX) < -100){
        frame.scrollLeft -= 500
    }
}