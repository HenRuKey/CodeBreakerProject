let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');
let guessing = document.getElementById('guessing-div');
let replay = document.getElementById('replay-div');

function guess() {
    let input = document.getElementById('user-guess');
    // Set values if values are null
    if (answer.value == "" || attempt.value == "") {
      setHiddenFields();
    }
    // Check for valid user input
    let valid = validateInput(input);

    if (valid) {
      // Check for correct values
      let allCorrect = getResults(input);
      // Implement winning conditions
      if(allCorrect) {
        setMessage("You Win! :)");
        showAnswer(allCorrect);
        showReplay();
      } else if (attempt.value == 10) {
        setMessage("You Lose! :(");
        showAnswer(allCorrect);
        showReplay();
      }
      else {
        setMessage("Incorrect: Try Again");
      }
  } // End valid conditional
} // End guess Function

function setHiddenFields() {
  // Generate random integer
  let randNum = Math.random(0, 9999) * 10000;
  answer.value = Math.floor(randNum);
  // Loop until value is four digits
  while (answer.value.length < 4) {
    answer.value = "0" +  answer.value;
  }
  // Set number of attempts to zero
  attempt.value = 0;
} // End setHiddenFields Function

function setMessage(displayMsg) {
  // Display message passed by the program
  message.innerHTML = displayMsg;
} // End setMessage Function

function validateInput(input) {
  if (input.value.length == 4) {
    attempt.value++;
    return true;
  }
  else {
    setMessage("Invalid Input: Must be four digits exactly")
    return false;
  }
} // End validateInput Function

function getResults(input) {
  // Create string to display results to user
  let displayString = "";
  // Create variable to count correct guesses
  let correct = 0;
  // Loop through each character in string
  for (i = 0; i < answer.value.length; i++) {
    // If the values are the same
    if (input.value[i] == answer.value[i]) {
      //displayString += "<span class=\"glyphicon glyphicon-ok\">" + input.value[i] + "</span>";
      displayString += "<span class=\"glyphicon glyphicon-ok\"></span>";
      correct++;
    }
    // If the values are different
    else {
      // Loop to check for char in answer
      let charInAnswer = false;
      for (j = 0; j < answer.value.length; j++) {
          if (input.value[i] == answer.value[j]) {
            charInAnswer = true;
          }
      }
      // If char is contained in answer
      if (charInAnswer) {
        displayString += "<span class=\"glyphicon glyphicon-transfer\"></span>";
      }
      // If the value isn't found in answer
      else {
        displayString += "<span class=\"glyphicon glyphicon-remove\"></span>";
      } // End else (value not contained in answer)
    } // End else (values not equal)
  } // End for loop
  // Display results to user
  let msg = "";
  let divRow = "<span class=\"col-md-6\">";
  msg += "<div class=\"row\">" + divRow + input.value + "</span>";
  msg += divRow + displayString + "</span><div class=\"col-md-6\">";
  results.innerHTML += msg;
  // Check for game win
  if (correct == answer.value.length) {
    return true;
  }
  else {
    return false;
  }
} // End getResults Function

function showAnswer(win) {
  // Reveal answer
  code.innerHTML = "<strong>" + answer.value + "</strong>";
  // Add string value to class name
  if (win) {
    code.className += " success";
  }
  else {
    code.className += " failure";
  }
} // End showAnswer Function

function showReplay() {
  guessing.style.display = 'none';
  replay.style.display = 'block';
  answer.value = '';
  attempt.value = '';
}
