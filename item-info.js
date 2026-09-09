
const params = new URLSearchParams(window.location.search);

const title = document.getElementById("title")
const style = document.getElementById("style")
const size = document.getElementById("size")

const carouselSlide = document.getElementsByClassName('slide')[0];
console.log(carouselSlide.firstElementChild)

const id = params.get("id");

console.log(id);

title.textContent = items[id].title
style.textContent = items[id].style
size.textContent = "Size: "+items[id].size
carouselSlide.firstElementChild.src = items[id].images[0]
for (let i = 1; i < items[id].images.length; i++){
    const clone = carouselSlide.cloneNode(true)
    carouselSlide.after(clone)
    clone.firstElementChild.src = items[id].images[i]
}
