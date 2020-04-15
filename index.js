
//Addsd new notes to list
function newElement() {
  let li = document.createElement("li");
  li.className = "draggable";
  //li.draggable=true;
  let inputValue = document.getElementById("myInput").value;
  let x = document.createElement("INPUT");
  x.setAttribute("type", "text");
  x.setAttribute("value", inputValue);
  x.className ="myTextInput";
  li.appendChild(x);
  document.getElementById("myUL").appendChild(li).style.display='block';

  document.getElementById("myInput").value = "";
  let image = document.createElement("IMG");
  image.setAttribute("src", "image/delete.png");
  let  remove = document.getElementsByClassName("remove");
  image.className = "remove";
  li.appendChild(image);

  let image2 = document.createElement("IMG");
  image2.setAttribute("src", "image/dragdrop.png");
  image2.className = "drag";
  let  drag = document.getElementsByClassName("drag");
  li.appendChild(image2);
  // image2.draggable=true;
  image2.classList.add('draggable');
    image2.draggable=true;

  //removes with 'x' button click
  for (let i = 0; i < remove.length; i++) {
    remove[i].onclick = function() {
       let div = this.parentElement;
       div.remove();
    }
  }
 // handleMouseMove();
 HandleEvents();

}

// delete input value
function deleteInput(){
document.getElementById("myInput").value = "";
}
let isalpha = false;
let isSort = false;
let rotated = false;

function sortList() {
  let div = document.getElementById('imagesort');
  div.src = 'image/sortblack.png';
  if (!isSort)
  {
    isSort=true;
    div.className='element2';

  }
  else
  {
    div.className='element';
    isSort=false;
  }

  draggables = document.querySelectorAll('.myTextInput');
  let listArray = [];

  if (isalpha != true )
  {

    for (let i = 0; i<draggables.length;i++) {
      listArray.push(draggables[i].value);
    }
      listArray.sort();
      listArray.sort((a,b)=> a-b);// for number
      list = document.getElementById('myUL');
      isalpha=true;

  }
  else
  {
    for (let i = 0; i<draggables.length;i++) {
      listArray.push(draggables[i].value);
    }
  listArray.reverse();
  list = document.getElementById('myUL');
  isalpha=false;
  }

  //delete all existing values to rewrite them in alphabetic order
  while (list.hasChildNodes()) {
  list.removeChild(list.firstChild);
  }

  //Add sorted values to list change images
  for(let i=0;i<listArray.length;i++)
  {
    let image = document.createElement("IMG");
    image.setAttribute("src", "image/delete.png");
    image.className = "remove";

    let image2 = document.createElement("IMG");
    image2.setAttribute("src", "image/dragdrop.png");
    image2.className = "drag";
    let  drag = document.getElementsByClassName("drag");
    image2.draggable =true;
    image2.classList.add('draggable');
    image2.draggable=true;


    let li = document.createElement("li");
    document.getElementById("myUL").appendChild(li);
    li.className = "draggable";
    //li.draggable=true;
    let x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("value", listArray[i]);
    x.className ="myTextInput";
    li.appendChild(x);
    li.appendChild(image);
    li.appendChild(image2);
  }

  //deleti while sorting
  let remove = document.getElementsByClassName("remove");
  for (let i = 0; i < remove.length; i++) {
    remove[i].onclick = function() {
    let div = this.parentElement;
    div.remove();
    draggables[i].remove();
    }

    HandleEvents();
  }
}


function HandleEvents() {
const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => { //// draggable===item 
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}


}







