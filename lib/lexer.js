
/**
 * Module Dependencies
 */


/**
 * Module Export
 */

 exports = module.exports = Lexer;

/**
 * Definitions
 */

 exports.definitions = {}

/**
 * Lexer Function
 *
 * @public
 */

 function Lexer() {
  this.str = null;
  this.index = 0;
  this.length = 1;
  this.tokens = [];
  this.lexemes = [];
  this.arrayPosition = -1;
  this.charPosition = 0;
  this.lineNumber = 0;

  // Current Token
  this.token = null;

  // End of File/Line
  this.eof = false;
  this.bof = true;
}

Lexer.prototype.start = function() {

  while(this.index + this.length <= this.str.length) {

    var previous  = this.str.substr(this.index - 1, this.length)
    , current   = this.str.substr(this.index, this.length)
    , next      = this.str.substr(this.index + 1, this.length)

    , smallChar = this.str.substr(this.index, this.length)
    , bigChar   = this.str.substr(this.index, this.length + 1);

    if (previous == '' || this.index - 1 === -1) {
      this.bof = true;
      previous = null;
    }

    if (next == '') {
      this.eof = true;
      this.next = null;
    }

    var found = false;
    for (var def in exports.definitions) {
      var obj = exports.definitions[def];

      var smallMatch = smallChar.match(obj.regexp) !== null;
      var bigMatch   = bigChar.match(obj.regexp) !== null;

      if (smallMatch && (! bigMatch || smallChar == bigChar)) {
        found = true;
        this.index += length;
        this.length = 0;
        this.tokens.push(def);
        this.lexemes.push(smallChar);
        break;
      }

    }
    this.length++;

    if (!found) {
      this.index += this.length;
      this.length = 0;
    }

    break;
  }

  return this;
};

Lexer.prototype.next = function(count) {
  if (! count) count = 1;
  while (count-- > 0) {
    this.arrayPosition++;
    if ( this.arrayPosition < this.tokens.length) {
      this.token = this.tokens[arrayPosition];
      this.lexeme = this.lexemes[arrayPosition];
      this.bof = false;
      this.char_position += this.lexeme.length;
      if (this.definitions[this.token].skip) {
        if (this.token == 'newline') {
          this.LineNumber++;
          this.charPosition = 0;
        }
        this.next();
      }
    } else {
      this.token = 'EOF';
      this.lexeme = null;
      this.eof = true;
    }
  }
}

Lexer.prototype.string = function(string) {
  if (!string) throw new Error("Invalid String.");
  this.str = string;
  return this;
};

Lexer.prototype.def = function(name, regex, skip) {
  if (arguments.length === 2) {
    skip = false;
  }

  if (!name && !regex) throw new Error("Invalid Definition");

  exports.definitions[name] = { regexp: regex, skip: skip };
  return this;
}

Lexer.init = function() {
  return new Lexer();
}