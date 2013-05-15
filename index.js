
/**
 * Module dependencies.
 */

var operator = require('tower-operator')
  , escapeRegExp = 'undefined' === typeof window
    ? require('escape-regexp-component')
    : require('escape-regexp')
  , Lexer = require('./lib/lexer');

/**
 * Expose `expression`.
 */

exports = module.exports = expression;

/**
 * Expose `Lexer`.
 */

exports.Lexer = Lexer;

/**
 * Collection
 */

exports.collection = [];

/**
 * Export Constructor
 */

exports.Expression = Expression;

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

function expression(name, fn) {
  if (exports.collection[name])
    return exports.collection[name];

  return exports.collection[name] = new Expression({
    name: name,
    fn: fn
  });
}

/**
 * Expression Constructor
 *
 * @param {Object} options
 */

function Expression(options) {

}