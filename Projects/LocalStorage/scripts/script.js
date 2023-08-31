console.log("");

let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024); 
let msg; 

db.transaction(function (tx) { 
  var sql = "CREATE TABLE users1"+ 
  "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "+
  "name VARCHAR(100) NOT NULL,"+ 
  "age INT(5) NOT NULL)";

  tx.executeSql(sql, undefined, function(){
    console.log("Data is created successfully");
  }, function(){
    console.log("Table is already created");}
  )
});

function save() {
  let nameSave = document.querySelector('#name').value;
  let ageSave = document.querySelector('#age').value;

  console.log("new name:" ,nameSave);
  console.log("new age:" ,ageSave);

  db.transaction(function (tx) { 
    var sql = `INSERT INTO users1 (name, age) VALUES ("${nameSave}", ${ageSave})`;

    tx.executeSql(sql, undefined, function(){
      console.log("Row is created successfully");
      }, function(){
      console.log("Row is already being created");})
    });

  msg = '<p>Data Saved.</p>'; 
  document.querySelector('#status').innerHTML =  msg; 
}

function deleted() {
  let nameSave = document.querySelector('#name').value;
  let ageSave = document.querySelector('#age').value;

  console.log("new name:" ,nameSave);
  console.log("new age:" ,ageSave);

  db.transaction(function (tx) { 
    var sql = `DELETE FROM users1 WHERE name = "${nameSave}" AND age = ${ageSave}`;

    tx.executeSql(sql, undefined, function(){
      console.log("Row is DELETED successfully");
      }, function(){
      console.log("Row does not exist");})
    });

  msg = '<p>Data Deleted.</p>'; 
  document.querySelector('#status').innerHTML =  msg; 
}

function update() {
  let nameSave = document.querySelector('#name').value;
  let ageSave = document.querySelector('#age').value;

  console.log("new name:" ,nameSave);
  console.log("new age:" ,ageSave);

  db.transaction(function (tx) { 
    var sql = `UPDATE users1 SET age = ${ageSave} WHERE name = "${nameSave}" `;
    tx.executeSql(sql, undefined, function(){
      console.log("Row is UPDATED successfully");
      }, function(){
      console.log("Row does not exist");})
    });

  msg = '<p>Data Updated.</p>'; 
  document.querySelector('#status').innerHTML =  msg; 
}

function search() {
  db.transaction(function (tx) { 
    var sql = `SELECT * FROM users1`;
    console.log(sql.length)

    tx.executeSql(sql, undefined, function(){
      console.log("Row is Selected successfully");
      
      let len = sql.rows.length, i; 
      msg = "<p>Found rows: " + len + "</p>"; 
      document.querySelector('#status').innerHTML +=  msg; 

      for (i = 0; i < len; i++) { 
        console.log(
          "id: "+sql.rows.item(i).id,
          "name: "+sql.rows.item(i).name,
          "age: " + sql.rows.item(i).age
          );
      } 
      }, function(){
      console.log("Row does not exist");})
    });

  msg = '<p>Data is presented.</p>'; 
  document.querySelector('#status').innerHTML =  msg; 
}

db.transaction(function (tx) {
  tx.executeSql('SELECT * FROM users1', [], function (tx, results) { 
    let len = results.rows.length, i; 
    msg = "<p>Found rows: " + len + "</p>"; 
    document.querySelector('#status').innerHTML +=  msg; 

    for (i = 0; i < len; i++) { 
      console.log(
        "id: "+results.rows.item(i).id,
        "name: "+results.rows.item(i).name,
        "age: " + results.rows.item(i).age
        );
    } 
  }, null); 
}); 