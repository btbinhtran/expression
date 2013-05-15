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

TreeGraph.prototype.addNode = function(node) {
  this.nodes.push(node);
};

