//Packages
var inquirer = require('inquirer');
var prompt = require('prompt');
var isLetter = require('is-letter');

//Link file
var word = require('./word.js');

//messages and prompts
prompt.start();

var game = {
  words : ["red", "yellow", "orange", "pink", "blue", "purple", "green"],
  guessesRemaining: 7,
  letterGuessed: '';
  victories: 0,
  losses: 0,
  currentWord: function(){
    return new Word(this.words[1])
  },
  showWord: function() {
    var what = this.currentWord().wordState();
    var idk = what.map(function(val){
      return val.appear;
    });
    return idk;
  },
  startGame: function(){
    console.log("Thank you for playing Constructor Hangman");
    console.log("Guess the color! You have seven guesses");
    console.log("Have Fun!");
  }
}
