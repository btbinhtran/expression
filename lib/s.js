/**
 * Module Export
 */

exports = module.exports = s

/**
 * Collection of S Expressions
 */

exports.collection = [];

/**
 * S Expression
 *
 * @param {String} name S Expression Identifier
 * @param {Function} fn Callback Function
 * @param {Object} options Optional Options
 */

function s(name, fn, options) {
  if (!name) throw new Error("Every S-Expression needs a name.");

  if (exports.collection[name])
    return exports.collection[name];

  return exports.collection[name] = new SExpression({
    name: name,
    fn: fn,
    options: options
  });
}

/**
 * S-Expression Constructor
 *
 * @param {Object} options
 */

function SExpression(options) {
  this.name = options.name;
  this.fn = options.fn;
  this.options = options;
}

/**
 * Parse the current SExpression
 */

SExpression.prototype.parse = function($scope) {

};