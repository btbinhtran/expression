var expression = 'undefined' == typeof window
  ? require('..')
  : require('tower-expression')
  , Lexer = expression.Lexer;

var assert = 'undefined' == typeof window
  ? require('assert')
  : require('component-assert');



var scopes = require('tower-scope');

describe('expression', function(){

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
          assert(lexer.token === Lexer.definitions.comma);
        }

    });

    it('should skip whitespace', function(){
      var lexer = Lexer.init()
        .def('whitespace', /^[\t \n]$/, true)
        .string('h h')
        .start();

        while(!lexer.eof) {
          lexer.next();
          assert(lexer.token === 'EOF');
        }
    });

    it('should not skip an identifier', function(){
      var lexer = Lexer.init()
        .def('squareleftbracket', /^[\[]$/)
        .string('[')
        .start();

        while(!lexer.eof) {
          lexer.next();
          assert(lexer.token === Lexer.definitions['squareleftbracket']);
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
          assert(lexer.token === Lexer.definitions['squarerightbracket']);
        }

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