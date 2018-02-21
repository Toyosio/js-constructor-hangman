//Packages
var inquirer = require('inquirer');
var prompt = require('prompt');
var isLetter = require('is-letter');

//Link file
var Word = require('./word.js');
var Game = require('./game.js');

//game variables
var wordConstr = Game.newWord.wordList;
var remainingGuesses = 7;
var lettersGuessed = [];
var currentWord = null;

function startGame() {
  var that = this;
console.log("Thank you for playing Constructor Hangman!");
console.log("Guess the color, you have 7 guesses!");
console.log("Enjoy!");

if(that.lettersGuessed > 0){
  that.lettersGuessed = [];
};
inquirer.prompt([
  {
    name: 'play',
    type: 'confirm',
    message: 'Time to get started. Ready?'
  }
]).then(function (answer){
  if(answer.play){
    resetGame();
  } else {
    console.log('See you next time!');
  }
});
};

function resetGame(){
  if(that.remainingGuesses === 7) {
    var randomWord = Math.floor(Math.random() * that.wordConstr.length);
    that.currentWord = new Word(that.wordConstr[randomWord]);
    that.currentWord.getLetters();
    console.log(that.currentWord.wordRender());
    that.promptPlayer();
  }else{
    that.resetGuesses();
    that.resetGame();
  }
}

function resetGuesses() {
  that.remainingGuesses = 7
};

function promptPlayer() {
  var that = this;
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
    for(var i = 0; i < that.lettersGuessed.length; i++){
      if(letterReturned === that.lettersGuessed[i]){
        guessedLetter = true;
      }
    }
    if(guessedLetter === false) {
      that.lettersGuessed.push(letterReturned);

      var foundLetter = that.currentWord.checkIfLetterFound(letterReturned)
      if(found === 0){
        console.log('Oops try again!');

        that.remainingGuesses --;

        console.log('Guesses Left: '+ that.remainingGuesses);
        console.log(that.currentWord.wordRender());
        console.log('Letters Guessed: '+ that.lettersGuessed);
      }else{
        console.log('Great Guess!');
        if(that.currentWord.checkWord() === true){
          console.log(that.currentWord.wordRender())
          console.log('YOU WIN');
          startGame();
        }else{
          console.log('Guesses Left: '+ remainingGuesses);
          console.log(that.currentWord.wordRender());
          console.log('Letters Guessed: '+ that.lettersGuessed);
        }
      }
      if(that.remainingGuesses > 0 && that.currentWord.wordFound === false){
        that.promptPlayer();
      } else if (that.remainingGuesses === 0){
        console.log('Game Over');
        console.log('The correct word was: '+ that.currentWord.Word);
      }
    }else{
      console.log('Letter already used, please try again!');
      that.promptPlayer();
    }
  })
}
startGame();
