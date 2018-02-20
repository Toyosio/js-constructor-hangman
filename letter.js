var Letter = function(ltr) {
  this.letter = ltr;
  this.appear = false;
  this.letterRender = function() {
    if(this.letter == ' ') {
      this.appear = true
      return ' ';
    }else{
      return this.letter;
    }
  };
};

module.exports = Letter;
