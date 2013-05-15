/**
 * Module Export
 */

exports = module.exports = Node;


/**
 * Node Constructor
 */

function Node(options) {
  this.parent = options && options.parent;
  this.children = [];
  this.token = null;
  this.isRoot = false;
  this.lexeme = null;
}

/**
 * Add a children node.
 */

Node.prototype.child = function(node) {
  node.parent = this;
  this.children.push(node);
  return this;
};
