
const item = document.getElementsByClassName("item")[0].parentElement

for(let i=0; i < items_to_list.length; i++)
{
    const dupe = item.cloneNode(true)
    item.before(dupe)
    dupe.href = "item-info.html?id="+items_to_list[i]
    dupe.firstElementChild.firstElementChild.firstElementChild.src = items[items_to_list[i]].images[0]
    dupe.firstElementChild.lastElementChild.textContent = items[items_to_list[i]].title
}

item.remove();
