console.log('08.25.23')
    
let pampers = [];
let x = 0;

function nums(num){
  if(true){
    if(pampers.length > 11){
      alert("You have reached the limit");
    } else {
      if(pampers[0] === '0'){
        document.querySelector('#answer').innerHTML = num;
        pampers = document.querySelector('#answer').innerHTML.split('');
      } else {
        if(x === 0){          
          document.querySelector('#answer').innerHTML = num;
          x++;
          pampers = document.querySelector('#answer').innerHTML.split('');
        } else {
          document.querySelector('#answer').innerHTML += num;
          pampers = document.querySelector('#answer').innerHTML.split('');
        }
      }
    }
  } else {
      alert("Choose an operator symbol first!");
  }
}

function sign(symbol){
  if(pampers.length  > 11){
    alert("You have reached the limit");
  } else {
    if(pampers[pampers.length-1] === '+' || pampers[pampers.length-1] === '-' || pampers[pampers.length-1] === '*' || pampers[pampers.length-1] === '/'){
      alert("Choose a number first");
    } else {
      document.querySelector('#answer').innerHTML += symbol;
      pampers = document.querySelector('#answer').innerHTML.split('');
    }
  }
}

function calculate() {
  let expression = document.getElementById("answer").innerHTML;
  let result = eval(expression);
  let resChecker = result.toString().split('')
  
  if(resChecker.length > 12){
    console.log(resChecker.length);
    resChecker.splice(12, 9);
    console.log(resChecker.length);
    document.getElementById("answer").innerHTML = resChecker.join('');      
    pampers = document.querySelector('#answer').innerHTML.split('');
  } else {
    console.log(resChecker.length);
    document.getElementById("answer").innerHTML = result;      
    pampers = document.querySelector('#answer').innerHTML.split('');
  }
}

function clearBtn() {   
  x = 0;
  pampers = [];
  document.querySelector('#answer').innerHTML = '&nbsp;';
}

function backSpace() {
  pampers.splice(pampers.length-1, 1);  

  if(pampers.length === 0){
    document.querySelector('#answer').innerHTML = '&nbsp;';
    pampers=[];
  } else {   
    document.querySelector('#answer').innerHTML = pampers.join('');
  }
}