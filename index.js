
/**
 * Module dependencies.
 */

var operator = require('tower-operator')
  , escapeRegExp = 'undefined' === typeof window
    ? require('escape-regexp-component')
    : require('escape-regexp')
  , Lexer = require('./lib/lexer')
  , expression = require('./lib/expression');

/**
 * Expose `expression`.
 */

exports = module.exports = expression;

/**
 * Expose `Lexer`.
 */

exports.Lexer = Lexer;

/**
 * ID used for non-named expressions
 */

exports.id = 0;

/**
 * Collection
 */

exports.collection = [];

/**
 * Export Constructor
 */

exports.s = s;

/**
 * Parse a directive expression.
 *
 * @param {String} val
 *
 * Usage:
 *   ```

 *     <li data-each="user in users, (max: 10, buffer: 2)"></li>
 *
 *     expression('arguments', function(args) {
 *
 *     });
 *
 *   ```
 */

function s(name, fn) {
  if (!name) name = id++;

  if (exports.collection[name])
    return exports.collection[name];

  return exports.collection[name] = new S({
    name: name,
    fn: fn
  });
}

/**
 * S Constructor
 */

function S(options) {
  this.name = options.name;
  this.fn = options.fn;
}

/**
 * Parse the following s expression. This will fire up
 * the expression found.
 */

S.prototype.parse = function(str, $scope) {
  var _str = str;
  str = str.split('|');
  str = str[0];

  function parseBeginning(s) {

  }

  function parseRest(s) {

  }


  // Create a new Lexer;
  var lexer = Lexer.init()
    .def('whitespace', /^[\t \n]$/, true)
    .def('comma', /^[\,]$/)
    .def('number', /^[0-9]+$/)
    .def('key', /^[A-Za-z0-9\-]+[:]$/)
    .def('leftParanthesis', /^\($/)
    .def('rightParanthesis', /^\)$/)
    .def('string', /^[A-Za-z0-9\-]+$/)
    .def('pipe', /^[\|]$/)
    .string(str)
    .start();


  var beg = true;
  var inContext = false;
  var currentContext = [];
  while(!lexer.eof) {
    lexer.next();

    if (lexer.token === 'EOF') {
      lexer.next();
      break;
    }

    if (inContext) {
      // Within a pipe;
      console.log(lexer.token);
    }

    if (lexer.token === 'pipe') {
      beg = false;
      inContext = true;
    }

    if (beg) {
      var key, arr;
      if (lexer.token === 'string') {
        key = lexer.lexeme;
      } else {
        throw new Error("Invalid Expression. Key name must be a string.");
      }

      // We don't care about the `in` string
      lexer.next();
      lexer.next();

      if (lexer.token === 'string') {
        arr = lexer.lexeme;
      } else {
        throw new Error("Invalid Expression. Array name must be a string");
      }

      currentContext.push({type: 'start', values: [key, arr]});

      lexer.next();


      var isArgs = false;
      if (lexer.token === 'comma') {
        var args = [];
        lexer.next();

        if (lexer.token === 'leftParanthesis') {

          while(lexer.token !== 'rightParanthesis' && lexer.token !== 'pipe' && lexer.token !== 'EOF') {
            lexer.next();
            console.log(lexer.token);
            args.push(lexer.lexeme);
          }

        }

      }

    }

  }
  console.log(currentContext);
};

s('list').parse('user in users, (max: 10)');

