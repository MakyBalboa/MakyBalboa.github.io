
let ScrollFrames = document.getElementsByClassName("Scroll-Frame")
let IsDragging = false

let mouseX = 0
let mouseY = 0

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
        ScrollFrames[i].classList.add("Dragging")
    })

    ScrollFrames[i].addEventListener("mouseup", function(e){
        IsDragging = false
        ScrollFrames[i].classList.remove("Dragging")
    })

    ScrollFrames[i].addEventListener("mouseleave", function(e){
        IsDragging = false
        ScrollFrames[i].classList.remove("Dragging")
    })
        

}