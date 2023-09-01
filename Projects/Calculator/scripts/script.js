console.log('08.25.23')
    
let pampers = [];
let x = 0;
let sym='';
let dotCounter = 0;
let num1 = null;
let num2 = '';

let expression;
let result;
let resChecker;

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
          document.querySelector('#value').innerHTML = num;
          x++;
          pampers = document.querySelector('#answer').innerHTML.split('');
          
          if(num === '.'){ dotCounter += 1; }
        } else {
          if(num === '.') { dotCounter += 1; }

          if(dotCounter === 2){
            alert("You already clicked the dot symbol!");
            dotCounter -= 1;
          } else {
            document.querySelector('#answer').innerHTML += num;
            document.querySelector('#value').innerHTML += num;
            pampers = document.querySelector('#answer').innerHTML.split('');
          }
        }
      }
    }
  } else {
    alert("Choose an operator symbol first!");
  }
}

function sign(symbol){
  sym=symbol;
  console.log(symbol);
  if(pampers.length  > 11){
    alert("You have reached the limit");
  } else {
    if(pampers[pampers.length-1] === '+' || pampers[pampers.length-1] === '-' || pampers[pampers.length-1] === '*' || pampers[pampers.length-1] === '/' || pampers[pampers.length-1] === '^' || pampers[pampers.length-1] === '√' || pampers[pampers.length-1] === 'o' || pampers[pampers.length-1] === 'c'){
      alert("Choose a number first");
    } else {
      if(symbol === 'o') {symbol = '('}
      if(symbol === 'c') {symbol = ')'}

      if(!num1) {num1 = document.querySelector('#value').innerHTML;}
      document.querySelector('#answer').innerHTML += symbol;
      pampers = document.querySelector('#answer').innerHTML.split('');
      document.querySelector('#value').innerHTML = '';
      dotCounter = 0;
      if(symbol === '-' || symbol === '√')
      x++;
    }
  }
}

function calculate() {
  if(sym === '√'){
    result = Math.sqrt(parseFloat(num2));
      
    console.log(resChecker.length);
    document.getElementById("answer").innerHTML = result;      
    pampers = document.querySelector('#answer').innerHTML.split('');
    num1 = result;
  } else {
    console.log(sym);
    expression = document.getElementById("answer").innerHTML;
    result = eval(expression);
    resChecker = result.toString().split('');
    
    num2 = document.querySelector('#value').innerHTML;
    console.log(num1, num2)
    if(resChecker.length > 12){
      console.log(resChecker.length);
      resChecker.splice(12, 9);
      console.log(resChecker.length);
      document.getElementById("answer").innerHTML = resChecker.join('');      
      pampers = document.querySelector('#answer').innerHTML.split('');
    } else {
      if(sym === '^'){
        result = Math.pow(parseFloat(num1), parseFloat(num2));
      }

      console.log(resChecker.length);
      document.getElementById("answer").innerHTML = result;      
      pampers = document.querySelector('#answer').innerHTML.split('');
      num1 = result;
    }
  }
}

function clearBtn() {   
  x = 0;
  pampers = [];
  document.querySelector('#answer').innerHTML = '&nbsp;';
  num1 = null;
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