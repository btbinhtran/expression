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
 *
 * ```
 *
 *   <li data-each="user in users, () | sort: alpha(user.username)"></li>
 *     `sort` is an s-expression, and alpha is a `sort` unit that
 *     accepts a single parameter from the current $scope.
 *
 *    `user in users, ()` is a special s-expression called
 *    `list` and accepts parameters.
 *
 *    Each S-Expression can pass some optional parsing options
 *    that create it's own customized syntax.
 *
 *
 * ```
 *
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
 *
 * @param {Scope} $scope Current Scope
 */

SExpression.prototype.parse = function($scope) {

};