console.log('09.02.23')
/* localStorage.removeItem("myArray"); */

let todoArray = JSON.parse(localStorage.getItem('myArray')) || [];
const table = document.getElementById('myTable2');

let x = 0;

for (i = 0; i < todoArray.length; i++) {
  let index = i;
  let itemNow = todoArray[i].toDo;
  let statusNow = todoArray[i].done;

  const newRow = table.tBodies[0].insertRow();

  const cell1 = newRow.insertCell(0);
  cell1.textContent = itemNow;
  cell1.classList.add('center-cell');
  cell1.classList.add('item-cell');
  cell1.setAttribute('id', 'item-cell');

  /* End of Column 1 inside table ------------------------------------------------------------ */

  const cell2 = newRow.insertCell(1);
  cell2.classList.add('center-cell');

  var box2 = document.createElement("input");
  box2.setAttribute("type", "checkbox");
  box2.textContent = '';
  box2.classList.add('js-done');

  if(statusNow){
    box2.checked = true;
  }

  cell2.addEventListener('change', () => {    
    if(statusNow){
      todoArray.splice(index, 1, { toDo: itemNow, done: false });
    } else {
      todoArray.splice(index, 1, { toDo: itemNow, done: true });
    }
    localStorage.setItem('myArray', JSON.stringify(todoArray));
    location.reload();
  });
  cell2.appendChild(box2);

  /* End of Column 2 inside table ------------------------------------------------------------ */

  const cell3 = newRow.insertCell(2);
  cell3.classList.add('center-cell');

  const btn3 = document.createElement('button');
  btn3.textContent = '';
  btn3.classList.add('js-delete');

  cell3.addEventListener('click', () => {    
    let text = "Are you sure you want to delete this item?\n"+itemNow;
    if (confirm(text) == true) {
      todoArray.splice(index, 1);
    
      localStorage.setItem('myArray', JSON.stringify(todoArray));
      location.reload(); 
    } else {
      console.log("User canceled");
    }
  });
  cell3.appendChild(btn3);

  /* End of Column 3 inside table ------------------------------------------------------------ */

  const cell4 = newRow.insertCell(3);
  cell4.classList.add('center-cell');
  
  const btn4 = document.createElement('button');
  btn4.textContent = '';
  btn4.classList.add('js-update');

  let x = 1;
  let inputField = document.createElement("input");
  inputField.type = "text";
  inputField.classList.add('inputUpdate');
  inputField.setAttribute('id', 'inputUpdate');

  cell4.addEventListener('click', () => {
    if(x%2 === 0){
      itemNow = inputField.value;
      cell1.innerHTML = itemNow;
      todoArray.splice(index, 1, { toDo: inputField.value, done: statusNow });
      localStorage.setItem('myArray', JSON.stringify(todoArray));
    } else {
      inputField.value = itemNow;
      cell1.innerHTML = "";
      cell1.appendChild(inputField);
    }

    x++;
    document.getElementById('inputUpdate').addEventListener("keydown", function(event) {
      if(event.key === "Enter"){
        itemNow = inputField.value;
        cell1.innerHTML = itemNow;
        todoArray.splice(index, 1, { toDo: inputField.value, done: statusNow });
        localStorage.setItem('myArray', JSON.stringify(todoArray));
        x++;
      }
    });
  });
  cell4.appendChild(btn4);
  newRow.appendChild(cell4);

  /* End of Column 4 inside table ------------------------------------------------------------ */

  const cell5 = newRow.insertCell(4);
  cell5.classList.add('col');
  cell5.classList.add('center-cell');
  cell5.classList.add('move-cell');

  const btn5 = document.createElement('button');
  btn5.textContent = '';
  btn5.classList.add('js-up');
  btn5.classList.add('row');

  const btn51 = document.createElement('button');
  btn51.textContent = '';
  btn51.classList.add('js-down');
  btn51.classList.add('row');

  btn5.addEventListener('click', () => {  
    let prev = index - 1;

    todoArray.splice(index, 1, { toDo: todoArray[prev].toDo, done: todoArray[prev].done });
    todoArray.splice(prev, 1, { toDo: itemNow, done: statusNow });

    localStorage.setItem('myArray', JSON.stringify(todoArray));
    location.reload(); 
  });

  btn51.addEventListener('click', () => {  
    let next = index + 1;

    todoArray.splice(index, 1, { toDo: todoArray[next].toDo, done: todoArray[next].done });
    todoArray.splice(next, 1, { toDo: itemNow, done: statusNow });

    localStorage.setItem('myArray', JSON.stringify(todoArray));
    location.reload(); 
  });
  cell5.appendChild(btn5);
  cell5.appendChild(btn51);

  /* End of Column 5 inside table ------------------------------------------------------------ */

}

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

