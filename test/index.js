var expression = 'undefined' == typeof window
  ? require('..')
  : require('tower-expression')
  , Lexer = expression.Lexer
  , Node = expression.Node
  , Graph = expression.TreeGraph;

var assert = 'undefined' == typeof window
  ? require('assert')
  : require('component-assert');



var scopes = require('tower-scope');

describe('expression', function(){

  describe('node', function(){

    it('should create a new node.', function(){
      var node = new Node();

      assert(node instanceof Node);
    });

    it('should have a parent node.', function(){
      var node = new Node({
        parent: new Node()
      });

      assert(node.parent instanceof Node);
    });

    it('should have child node.', function(){
      var child = new Node();
      var node = new Node()
        .child(child);

      assert(node.children[0] === child);
    });

    it('should assign parents when defining as a child', function(){
      var child = new Node();
      var node = new Node()
        .child(child);

      assert(child.parent === node);
    });

  });

  describe('tree', function(){

    it('should create a new tree graph', function(){
      var graph = new Graph();
      assert(graph instanceof Graph);
    });

    it('should add a node to the graph', function(){
      var graph = new Graph()
        .node(new Node());

      assert(graph.nodes[0] instanceof Node);
    });

    it('should add a parent -> child node to the graph', function(){
      var child = new Node()
        , parent = new Node()
          .child(child)
        , graph = new Graph()
        .node(parent);

      assert(graph.nodes[0] === parent);
      assert(graph.nodes[0].children[0] === child);
    });

    it('should traverse a few child nodes.', function(){
      /**
       *      Tree
       *        |
       *      Node A
       *       /  \
       *      B    C
       *    /       \
       *   D         E
       */

       var A = new Node()
        ,  B = new Node()
        ,  C = new Node()
        ,  D = new Node()
        ,  E = new Node();

      C.child(E);
      B.child(D);

      A.child(B);
      A.child(C);

      var graph = new Graph()
        .root(A);

      graph
    });

  });

  describe('ast', function(){

    it('should build a simple AST', function(){

      var graph = new Graph();

      var lexer = Lexer.init()
        .def('whitespace', /^[\t \n]$/, true)
        .def('plus', /^[\+]$/)
        .def('number', /^[0-9]+$/)
        .string('1 + 1')
        .start();

      while(!lexer.eof) {
        lexer.next();
      }

    });

  });

  describe('lexer', function(){

    it('should create a new lexer', function(){
      var lexer = Lexer.init()
        .def('random', /$/)
        .string(',');

      assert(lexer instanceof Lexer);
      assert(lexer.str === ',');
      assert('object' === typeof lexer.defs['random'])
    });

    it('should use lexer API', function(){
      var lexer = Lexer.init()
        .def('comma', /^,$/)
        .string(',')
        .start();

        while(!lexer.eof) {
          lexer.next();
          if (!lexer.eof)
            assert(lexer.lexeme === ",");
        }

    });

    it('should skip whitespace', function(){
      var lexer = Lexer.init()
        .def('whitespace', /^[\t \n]$/, true)
        .def('letter', /^[A-Za-z]$/)
        .string('h h')
        .start();

        var arr = [];
        while(!lexer.eof) {
          lexer.next();
          if (lexer.token !== 'EOF')
            arr.push(lexer.token);
        }

        assert(arr[0] === 'letter' && arr[1] === 'letter');
    });

    it('should not skip an identifier', function(){
      var lexer = Lexer.init()
        .def('squareleftbracket', /^[\[]$/)
        .string('[')
        .start();

        while(!lexer.eof) {
          lexer.next();
          if (!lexer.eof)
            assert(lexer.lexeme === '[' );
        }
    });

    it('should process two tokens', function(){

      var lexer = Lexer.init()
        .def('squareleftbracket', /^[\[]$/)
        .def('squarerightbracket', /^[\]]$/)
        .string(']')
        .start();

        while(!lexer.eof) {
          lexer.next();
          if (!lexer.eof)
            assert(lexer.lexeme === ']');
        }

    });

    it('should process parentheses', function(){

      var lexer = Lexer.init()
        .def('lp', /^\($/)
        .def('rp', /^\)$/)
        .string('()')
        .start();

        while(!lexer.eof) {
          lexer.next();
        }

        assert(lexer.tokens = ['lp', 'rp', 'EOF'])
    });

    it('should lex two tokens and skip the whitespace in between them', function(){

      var lexer = Lexer.init()
        .def('string', new RegExp("^\"[^\"]*\"|\'[^\']*\'$"))
        .def('whitespace', /^[\t \n]$/, true)
        .def('pipe', /^[\|]$/)
        .string('str |')
        .start()

        while(!lexer.eof) {
          lexer.next();
        }

        assert(lexer.tokens = ['string', 'rp', 'EOF']);
    });

  });

  /**describe('operators', function(){
    it('should parse simple math expression', function(){
      var fn = expression('1 + 1');
      assert(2 === fn());
      var fn = expression('2 * 2');
      assert(4 === fn());
    });

    it('should parse >', function(){
      var fn = expression('1 > 2');
      assert(false === fn());
    });

    it('should parse >=', function(){
      var fn = expression('1 >= 2');
      assert(false === fn());
      var fn = expression('1 >= 1');
      assert(true === fn());
    });

    it('should parse <', function(){
      var fn = expression('1 < 2');
      assert(true === fn());
    });

    it('should parse <=', function(){
      var fn = expression('2 <= 2');
      assert(true === fn());
      var fn = expression('2 <= 1');
      assert(false === fn());
    });
  });

  it('should parse attribute', function(){
    var fn = expression('todo');
    var string = [
        "function anonymous(scope) {"
      , "  return scope.get('todo')"
      , "}"
    ].join('\n');
    assert(string === fn.toString());
  });

  describe('function', function(){
    it('should parse method', function(){
      var fn = expression('createTodo()');
      var string = [
          "function anonymous(scope) {"
        , "  return scope.call('createTodo')"
        , "}"
      ].join('\n');
      assert(string === fn.toString());
    });

    it('should parse method with arguments', function(done){
      var fn = expression('create(todo)');
      var string = [
          "function anonymous(scope) {"
        , "  return scope.call('create', scope.get('todo'))"
        , "}"
      ].join('\n');
      assert(string === fn.toString());

      scopes('todo')
        .action('create', function(todo){
          assert('A todo!' === todo.title);
          done();
        });

      var ctx = scopes('todo').init({ todo: { title: 'A todo!' } });
      fn(ctx);
    });
  });

  describe('options', function(){
    it('should parse options', function(){
      var fn = expression('todo in todos [max:10, buffer:5]');
      assert('{"max":10,"buffer":5}' === JSON.stringify(fn.opts));
    });
  });

  describe('dependencies', function(){
    it('should collect the property dependencies referenced', function(){
      var fn = expression('create(todo)');
      assert('todo' === fn.deps.join(','));
      var fn = expression('create(todo, event)');
      assert('todo,event' === fn.deps.join(','));
      var fn = expression('todo && event');
      assert('todo,event' === fn.deps.join(','));
      var fn = expression('todo || event');
      assert('todo,event' === fn.deps.join(','));
      var fn = expression('todos.length > 10');
      assert('todos.length' === fn.deps.join(','));
    });
  });**/
});