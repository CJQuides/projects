console.log('08.23.23');
console.log('08.24.23 - Saving');

console.log(JSON.parse(localStorage.getItem('overalls')));

let overall = JSON.parse(localStorage.getItem('overalls')) || {
  correct : 0,
  wrong : 0
};

document.getElementById('corrects').innerHTML = "Correct: "+overall.correct;
document.getElementById('wrongs').innerHTML = "Wrong: "+overall.wrong;

function maker(){
  let answer = Math.floor(Math.random()*2)
  let x = answer;

  document.getElementById('result').innerHTML = "You are: ";
  return x;
}

function checker(guess){
  if(guess === maker()){
    overall.correct += 1;
    document.getElementById('result').innerHTML += "CORRECT!";
    document.getElementById('results').style.backgroundColor = "#98fb98";
  } else {
    overall.wrong += 1;
    document.getElementById('result').innerHTML += "WRONG!";
    document.getElementById('results').style.backgroundColor = "#E34234";
  }
  document.getElementById('corrects').innerHTML = "Correct: "+overall.correct;
  document.getElementById('wrongs').innerHTML = "Wrong: "+overall.wrong;

  let conclusion = overall.correct === 10 ? 'won' : (overall.wrong === 10 ? 'lost' : '-');

  if(conclusion !== '-'){
    alert("You "+ conclusion+ "!");
    overall.correct = 0;
    overall.wrong = 0;
  }
}

function save(guess){
  checker(guess);
  localStorage.setItem("overalls", JSON.stringify(overall));
}

function reset(){
  overall.correct = 0;
  overall.wrong = 0;
  console.log(overall);
  localStorage.setItem("overalls", JSON.stringify(overall));

  document.getElementById('corrects').innerHTML = "Correct: " + overall.correct;
  document.getElementById('wrongs').innerHTML = "Wrong: " + overall.wrong;

  document.getElementById('result').innerHTML = "You are:";
  document.getElementById('results').style.backgroundColor = "#b37fd8";
}