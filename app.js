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

if(lettersGuessed.length > 0){
  lettersGuessed = [];
}
inquirer.prompt([
  {
    name: 'Time to play?',
    type: 'confirm',
    message: 'Time to get started. Ready?'
  }
]).then(function (answer){
  if(answer.play){
    console.log(' ');
    console.log("Guess the color! You have seven guesses!");
    console.log("Have Fun!");
    resetGame();
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
}

function promptPlayer() {
  inquirer.prompt([
    {}
  ])
}
