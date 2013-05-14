
/**
 * Module dependencies.
 */

var operator = require('tower-operator')
  , escapeRegExp = 'undefined' === typeof window
    ? require('escape-regexp-component')
    : require('escape-regexp');

/**
 * Expose `expression`.
 */

exports = module.exports = expression;

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
 * @return {Function} fn Expression to evaluate
 *    against the current `scope`.
 */

function expression(name, fn) {
  if (exports.collection[name])
    return exports.collection[name];



}

/**
 * Expression Constructor
 *
 * @param {Object} options
 */

function Expression(options) {


}