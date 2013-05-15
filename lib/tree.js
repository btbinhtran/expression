/**
 * Module Export
 */

exports = module.exports = TreeGraph;


/**
 * TreeGraph Constructor
 */

function TreeGraph(options) {
  this.nodes = [];
}

TreeGraph.prototype.node = function(node) {
  this.nodes.push(node);
  return this;
};

TreeGraph.prototype.root = function(node) {
  this.nodes.push(node);
  node.isRoot = true;
  return this;
};
