console.log('09.02.23')/* 
localStorage.removeItem("myArray"); */
let todoArray = JSON.parse(localStorage.getItem('myArray')) || [];
const table = document.getElementById('myTable2');

let x = 0;
todoArray.forEach((item, index) => {
  let storedItems = JSON.parse(localStorage.getItem('myArray'));
  const newRow = table.tBodies[0].insertRow();

  const cell1 = newRow.insertCell(0);
  cell1.textContent = item.toDo;
  cell1.classList.add('center-cell');
  cell1.classList.add('item-cell');
  cell1.setAttribute('id', 'item-cell');

  const cell2 = newRow.insertCell(1);
  var box2 = document.createElement("input");
  box2.setAttribute("type", "checkbox");

  box2.textContent = '';
  box2.classList.add('js-done');
  cell2.classList.add('center-cell');
  //box2.id

  if(item.done){
    box2.checked = true;
  }

  cell2.addEventListener('change', () => {    
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

  cell3.addEventListener('click', () => {/* 
    storedItems.splice(index, 1);
  
    localStorage.setItem('myArray', JSON.stringify(storedItems));
    location.reload(); */
    
    let text = "Are you sure you want to delete this item?\n"+item.toDo;
    if (confirm(text) == true) {
      storedItems.splice(index, 1);
    
      localStorage.setItem('myArray', JSON.stringify(storedItems));
      location.reload(); 
    } else {
      console.log("User canceled");
    }
  });
  cell3.appendChild(btn3);

  const cell4 = newRow.insertCell(3);
  const btn4 = document.createElement('button');
  btn4.textContent = '';
  btn4.classList.add('js-update');
  cell4.classList.add('center-cell');

  let x = 1;
  let inputField = document.createElement("input");
  inputField.type = "text";
  inputField.classList.add('inputUpdate');
  inputField.setAttribute('id', 'inputUpdate');

  cell4.addEventListener('click', () => {
    if(x%2 === 0){
      item.toDo = inputField.value;
      cell1.innerHTML = item.toDo;
      storedItems.splice(index, 1, { toDo: inputField.value, done: item.done });
      localStorage.setItem('myArray', JSON.stringify(storedItems));
    } else {
      inputField.value = item.toDo;
      cell1.innerHTML = "";
      cell1.appendChild(inputField);
    }

    x++;
    document.getElementById('inputUpdate').addEventListener("keydown", function(event) {
      if(event.key === "Enter"){
        item.toDo = inputField.value;
        cell1.innerHTML = item.toDo;
        storedItems.splice(index, 1, { toDo: inputField.value, done: item.done });
        localStorage.setItem('myArray', JSON.stringify(storedItems));
        x++;
      }
    });
  });
  cell4.appendChild(btn4);
  newRow.appendChild(cell4);

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
  if(event.key === "Enter"){
    saveToDo();
  }
});