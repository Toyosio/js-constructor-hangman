//packages
var Letters = require("./letter.js");
const fs = require('fs');

//Constructor
function word(werd) {
  this.word = werd;
  this.letters = [];
  this.correctWord = false;

//gets letters in word
  this.getLetters = function(){
    for (var i=0; i < this.werd.length; i++) {
      this.letters.push(new letter(this.werd[i]));
    }
  };

//determines if user guessed correct word
  this.checkWord = function(){
    if(this.letters.every(function(currentLetter) {
      return currentLetter.appear;
    })) {
      this.correctWord = true;
      return true;
    }
  }

  //determines if letter typed is in the correctWord
  this.checkLetter = function(guessedLetter) {
    var whatToReturn = 0;

    for (var i=0; i < this.letters.length; i++) {
      if(this.letters[i] == guessedLetter){
        this.letters[i].append = true;
        whatToReturn++;
      }
    }
    return whatToReturn;
  };

  //show word
this.workRender = function(){
  var showWord = '';
  for(var i=0; i < this.letters.length; i++){
    showWord += this.letters[i].letterRender();
  }
  return showWord;
};

}
module.exports = Word;
