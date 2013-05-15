
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

  return exports.collection[name] = new Expression({
    name: name,
    fn: fn
  });
}
