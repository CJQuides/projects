console.log('09.02.23')/* 
localStorage.removeItem("myArray"); */
let todoArray = JSON.parse(localStorage.getItem('myArray')) || [];
const table = document.getElementById('myTable2');

let x = 0;
todoArray.forEach((item, index) => {
  const newRow = table.tBodies[0].insertRow();

  const cell1 = newRow.insertCell(0);
  cell1.textContent = item.toDo;
  cell1.classList.add('center-cell');
  cell1.classList.add('item-cell');

  const cell2 = newRow.insertCell(1);
  var box2 = document.createElement("input");
  box2.setAttribute("type", "checkbox");

  box2.textContent = '';
  box2.classList.add('js-done');
  cell2.classList.add('center-cell');

  if(item.done){
    box2.checked = true;
  }

  cell2.addEventListener('change', () => {
    let storedItems = JSON.parse(localStorage.getItem('myArray'));
    
    if(item.done){
      storedItems.splice(index, 1, { toDo: item.toDo, done: false });
    } else {
      storedItems.splice(index, 1, { toDo: item.toDo, done: true });
    }
    localStorage.setItem('myArray', JSON.stringify(storedItems));
  });
  cell2.appendChild(box2);

  const cell3 = newRow.insertCell(2);
  const btn3 = document.createElement('button');
  btn3.textContent = '';
  btn3.classList.add('js-delete');
  cell3.classList.add('center-cell');

  cell3.addEventListener('click', () => {
    let storedItems = JSON.parse(localStorage.getItem('myArray'));
    storedItems.splice(index, 1);
  
    localStorage.setItem('myArray', JSON.stringify(storedItems));
    location.reload();
  });
  cell3.appendChild(btn3);

  x++;
  console.log(x);
  
});

function saveToDo(){
  const inputValue = document.querySelector(".input").value;
  console.log("new item:" ,inputValue);

  if(inputValue){
    todoArray.push({ toDo: inputValue, done: false });
    console.log("array",todoArray);

    localStorage.setItem("myArray", JSON.stringify(todoArray));

    location.reload(); // or icall yung pang display
  }
}

document.getElementById('inputToDo').addEventListener("keydown", function(event) {
  // Define the key you want to validate (e.g., "Enter")
  if(event.key === "Enter"){
    saveToDo();
  }
});