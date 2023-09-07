console.log('09.02.23')

let todoArray = JSON.parse(localStorage.getItem('myArray')) || [];

const table = document.getElementById('myTable2');

let x = 0;
todoArray.forEach((item, index) => {
  const newRow = table.tBodies[0].insertRow();

  const cell1 = newRow.insertCell(0);
  cell1.textContent = item;
  cell1.classList.add('center-cell');
  cell1.classList.add('item-cell');

  const cell2 = newRow.insertCell(1);
  const button = document.createElement('button');
  button.textContent = '';
  button.classList.add('js-delete');
  cell2.classList.add('center-cell');

  cell2.addEventListener('click', () => {
    let storedItems = JSON.parse(localStorage.getItem('myArray'));
    storedItems.splice(index, 1);
  
    localStorage.setItem('myArray', JSON.stringify(storedItems));
    location.reload();
  });
  cell2.appendChild(button);

    x++;
    console.log(x);
  
});

function saveToDo(){
  const inputValue = document.querySelector(".input").value;
  console.log("new item:" ,inputValue);

  todoArray.push(inputValue);
  console.log("array",todoArray);

  localStorage.setItem("myArray", JSON.stringify(todoArray));

  location.reload(); // or icall yung pang display
}