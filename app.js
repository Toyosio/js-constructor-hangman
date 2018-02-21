//Packages
var inquirer = require('inquirer');
var prompt = require('prompt');
var isLetter = require('is-letter');

//Link file
var word = require('./word.js');
var game = require('./game.js');

//game variables
var words = game.newWord.wordList;
var remainingGuesses = 7;
var lettersGuessed = [];
var currentWord;

//start game
startGame();

function startGame() {
console.log("Thank you for playing Constructor Hangman!");
console.log("Guess the color, you have 7 guesses!");
console.log("Enjoy!");

if(lettersGuessed.length > 0){
  lettersGuessed = [];
}
inquirer.prompt([
  {
    name: 'Time to play!',
    type: 'confirm',
    message: 'Time to get started. Ready?'
  }
]).then(function (answer){
  if(answer.play){
    console.log(' ');
    console.log("Guess the color! You have seven guesses!");
    console.log("Have Fun!");
    promptPlayer();
  } else {
    console.log('See you next time!');
  }
})
}

function resetGame(){
  if(remainingGuesses === 7) {
    var randomWord = Math.floor(Math.random() * word.length);
    currentWord = new Word(word[randomWord]);
    currentWord.getLetters();
    console.log('');
    console.log(currentWord.wordRender());
    console.log('');
    promptPlayer();
  }else{
    resetGuesses();
    resetGame();
  }
}

function resetGuesses() {
  remainingGuesses = 7
};

function promptPlayer() {
  inquirer.prompt([
    {
      name: 'chosenLetter',
      type: 'input',
      message: 'Pick a letter, any letter!',
      validate: function(value){
        if(isLetter(value)){
          return true;
        }else{
          return false;
        }
      }
  }]).then(function(letter){
    var guessedLetter = false;
    for(var i = 0; i < lettersGuessed.length; i++){
      if(letterReturned === lettersGuessed[i]){
        guessedLetter = true;
      }
    }
    if(guessedLetter === false) {
      lettersGuessed.push(letterReturned);

      var foundLetter = currentWord.checkIfLetterFound(letterReturned)
      if(found === 0){
        console.log('Oops try again!');

        remainingGuesses --;

        console.log('Guesses Left: '+ remainingGuesses);
        console.log('Letters Guessed: '+ lettersGuessed);
      }else{
        console.log('Great Guess!');
        if(currentWord.checkWord() === true){
          console.log(currentWord.wordRender())
          console.log('YOU WIN');
          startGame();
        }else{
          console.log('Guesses Left: '+ remainingGuesses);
          console.log(currentWord.wordRender());
          console.log('Letters Guessed: '+ lettersGuessed);
        }
      }
      if(remainingGuesses > 0 && currentWord.wordFound === false){
        promptPlayer();
      } else if (remainingGuesses === 0){
        console.log('Game Over');
        console.log('The correct word was: '+ currentWord.word);
      }
    }else{
      console.log('Letter already used, please try again!');
      promptPlayer();
    }
  })
}
