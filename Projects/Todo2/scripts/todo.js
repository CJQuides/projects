console.log('09.02.23')
/* localStorage.removeItem("myArray"); */

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfHhdhBx0mz0qNCHLnALnc7h6n-HmY65c",
  authDomain: "todolist-65707.firebaseapp.com",
  databaseURL: "https://todolist-65707-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todolist-65707",
  storageBucket: "todolist-65707.appspot.com",
  messagingSenderId: "99901023216",
  appId: "1:99901023216:web:eaf23685866fda04963335",
  measurementId: "G-Z72Y4KG65W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, get, set, child, update, remove }
from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const db = getDatabase();

const dbref = ref(db);

// End of Database --------------------------------------------------------------------------------- 

let userId = localStorage.getItem("userId");
let userName = localStorage.getItem("userName");
const table = document.getElementById('myTable2');
let newTodoTxtBx = document.querySelector('.input-box');

const title = document.querySelector(".todo-title")
title.innerHTML = `${userName}'s TO DO LIST`

//#region DISPLAY TABLE
function displayTable(){
  get(child(dbref, `Records/${userId}/todo/`))
  .then((snapshot)=>{
    if(snapshot.exists()){
      let objs = snapshot.val();
      let keys = Object.keys(objs).reverse();
      // keys = keys.reverse();
      objs = objs.reverse();
      let k = 0

      for (const key in objs) {
        // console.log("Key:", keys[k]);
        let keyNow = keys[k];
        keyNow = parseInt(keyNow);        
        let nextKey = parseInt(keys[k-1]);
        let prevKey = parseInt(keys[k+1]);
        k++;

        let itemNow = objs[key].todo;
        let statusNow = objs[key].status;
        let rowNow = objs[key].id;

        const newRow = table.tBodies[0].insertRow();
      
        const cell1 = newRow.insertCell(0);
        cell1.textContent = itemNow;
        cell1.classList.add('center-cell');
        cell1.classList.add('item-cell');
        cell1.setAttribute('id', 'item-cell');
      
        // End of Column 1 inside table ------------------------------------------------------------

        //#region COLUMN 2 - STATUS
        const cell2 = newRow.insertCell(1);
        cell2.classList.add('center-cell');

        let box2 = document.createElement("input");
        box2.setAttribute("type", "checkbox");
        box2.textContent = '';
        box2.classList.add('js-done');

        if(statusNow == "Done"){
          box2.checked = true;
        } else {
          box2.checked = false;
        }

        cell2.addEventListener('change', () => {   
          if(statusNow == "Ongoing"){
            update(ref(db, `Records/${userId}/todo/${keyNow}`),{
              status: "Done"
            })
            .then(()=>{
              alert("Data updated successfully");
            })
            .catch((error)=>{
                alert(error);
            });
          } else {
            update(ref(db, `Records/${userId}/todo/${keyNow}`),{
              status: "Ongoing"
            })
            .then(()=>{
              alert("Data updated successfully");
            })
            .catch((error)=>{
                alert(error);
            });
          }
          location.reload();
        });
        cell2.appendChild(box2);
        //#endregion

        // End of Column 2 inside table ------------------------------------------------------------

        //#region COLUMN 3 - DELETE
        const cell3 = newRow.insertCell(2);
        cell3.classList.add('center-cell');
        
        const btn3 = document.createElement('button');
        btn3.textContent = '';
        btn3.classList.add('js-delete');
        
        cell3.addEventListener('click', () => {    
          let text = "Are you sure you want to delete this item?\n"+itemNow;
          if(confirm(text) == true) {
            remove(ref(db, `Records/${userId}/todo/${keyNow}`))
            .then(()=>{
              alert("Data deleted successfully");
            })
            .catch((error)=>{
              alert(error);
            });
            location.reload(); 
          } else {
            console.log("User canceled");
          }
        });
        cell3.appendChild(btn3);
        //#endregion
        
        // End of Column 3 inside table ------------------------------------------------------------
        
        //#region COLUMN 4 - UPDATE
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
            // SAVING
            itemNow = inputField.value;
            cell1.innerHTML = itemNow;
            
            update(ref(db, `Records/${userId}/todo/${keyNow}`),{
              todo: inputField.value
            })
            .then(()=>{
              alert("Data updated successfully");
            })
            .catch((error)=>{
                alert(error);
            });
            
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
            
              update(ref(db, `Records/${userId}/todo/${keyNow}`),{
                todo: inputField.value
              })
              .then(()=>{
                alert("Data updated successfully");
              })
              .catch((error)=>{
                  alert(error);
              });
              x++;
            }
          });
        });
        cell4.appendChild(btn4);
        newRow.appendChild(cell4);
        //#endregion

        // End of Column 4 inside table ------------------------------------------------------------

        //#region MOVE
        const cell5 = newRow.insertCell(4);
        cell5.classList.add('col');
        cell5.classList.add('center-cell');
        cell5.classList.add('move-cell');

        const upBtn = document.createElement('button');
        upBtn.textContent = '';
        upBtn.classList.add('js-up');
        upBtn.classList.add('row');

        const downBtn = document.createElement('button');
        downBtn.textContent = '';
        downBtn.classList.add('js-down');
        downBtn.classList.add('row');

        upBtn.addEventListener('click', () => {     
          const recordRef1 = child(dbref, `Records/${userId}/todo/${keyNow}`);
          const recordRef2 = child(dbref, `Records/${userId}/todo/${nextKey}`);
          console.log(keyNow+" "+nextKey)
          
          Promise.all([get(recordRef1), get(recordRef2)])
            .then((snapshots) => {
              const data1 = snapshots[0].val();
              const data2 = snapshots[1].val();
          
              if (data1 !== null && data2 !== null) {
                set(recordRef1, data2);
                set(recordRef2, data1);
            
                update(ref(db, `Records/${userId}/todo/${keyNow}`),{
                  id: keyNow
                });            
                update(ref(db, `Records/${userId}/todo/${nextKey}`),{
                  id: nextKey
                })
                location.reload(); 
                console.log(`Successfully exchanged data between ${keyNow} and ${nextKey}`);
              } else {
                console.log(`One or both keys do not exist in the database.`);
              }
            })
            .catch((error) => {
              console.error(`Error exchanging data: ${error}`);
            });
        });

        downBtn.addEventListener('click', () => {  
          const recordRef1 = child(dbref, `Records/${userId}/todo/${keyNow}`);
          const recordRef2 = child(dbref, `Records/${userId}/todo/${prevKey}`);
          console.log(keyNow+" "+prevKey)
          
          Promise.all([get(recordRef1), get(recordRef2)])
            .then((snapshots) => {
              const data1 = snapshots[0].val();
              const data2 = snapshots[1].val();
          
              if (data1 !== null && data2 !== null) {
                set(recordRef1, data2);
                set(recordRef2, data1);
            
                update(ref(db, `Records/${userId}/todo/${keyNow}`),{
                  id: keyNow
                });            
                update(ref(db, `Records/${userId}/todo/${prevKey}`),{
                  id: prevKey
                })
                location.reload(); 
                console.log(`Successfully exchanged data between ${keyNow} and ${nextKey}`);
              } else {
                console.log(`One or both keys do not exist in the database.`);
              }
            })
            .catch((error) => {
              console.error(`Error exchanging data: ${error}`);
            });
        });
        cell5.appendChild(upBtn);
        cell5.appendChild(downBtn);
        //#endregion

        // End of Column 5 inside table ------------------------------------------------------------
        
      }
    } else {
      //document.querySelector('.tbody').innerHTML = `<div class='alert alert-danger'><em>No records were found.</em></div>`;
      //alert("No data found");
      // document.querySelector('.js-no-record').style.visibility = 'visible';
    }
  })
  .catch((error)=>{
    alert(error)
  })
}
displayTable();
//#endregion

//#region SAVE NEW DATA
newTodoTxtBx.addEventListener("keydown", function(event) {
  if(event.key === "Enter"){
    countData();
  }
});

let showAddTb = document.querySelector(".showAddTbBtn");
let addTodoDiv = document.querySelector('.addTodo');

showAddTb.addEventListener("click", function() {
  if(addTodoDiv.style.display=='none'){
    addTodoDiv.style.display='block';
    newTodoTxtBx.focus();
  } else {
    countData();
  }
});

function countData(){
  let lastId = 1;
  if(newTodoTxtBx.value){
    get(child(dbref, `Records/${userId}/todo/`))
    .then((snapshot)=>{
      if(snapshot.exists()){
        let objs = snapshot.val();
        let keys = Object.keys(objs);
        let k = 0

        for (const key in objs) {
          let keyNow = parseInt(keys[k]);
          k++;
          lastId = keyNow;
        }
      } else {
        lastId-=1;
      }
      lastId+=1;
      saveData(lastId);
    })
    .catch((error)=>{
      alert(error)
    })
  } else {
    alert("To do cannot be empty.");
  }
}

function saveData(counter){
  set(ref(db, `Records/${userId}/todo/` + counter), {
    id: counter,
    todo: newTodoTxtBx.value,
    status: "Ongoing"
  })
  .then(() => {
    alert("Data added successfully");      
    location.reload();
  })
  .catch((error) => {
    alert(error);
  });
}

//#endregion

/* 
fdfsfdf sfsdfsfs fsfsfsfsdf sfsdfsdfsdfsd fsdfsfsdfsf sdfsdfsdfsdf sdfsdfsdfsdf sdfsfsdfsdfsdf sfsdfsdfsdf sdfsdfsdfs dfsdfsdfsdfsfs dfsdfsdfsdfsd fsdfsdfsfsdf sdfsdfsdfsd fsdfsdfsdfsdf sdfsdfsdfsd fsdfsdfsdfsd fsdfsdfsdfsdf sdfsdfsdfsfsdfsdfsdfsdfsfsdfs dfsdfsdfsdfs dfsdfsdfsdfs fsdfsdfsdf
*/