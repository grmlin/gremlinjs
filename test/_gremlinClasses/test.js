(function() {
  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(["lib/gremlinjs/gremlins/AbstractGremlin"], function(AbstractGremlin) {
    var HelloWorld;
    return HelloWorld = (function(_super) {

      __extends(HelloWorld, _super);

      function HelloWorld() {
        HelloWorld.__super__.constructor.apply(this, arguments);
        this.foo = "bar";
        this.view.html("Hello, world! :) #" + this.id);
      }

      return HelloWorld;

    })(AbstractGremlin);
  });

}).call(this);
