(function() {
  var Espresso,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Espresso = (function(_super) {
    __extends(Espresso, _super);

    function Espresso() {
      Espresso.__super__.constructor.apply(this, arguments);
      this.el.innerHTML = "Espresso " + this.id + ", hmmmm";
      console.dir(this.klass);
    }

    return Espresso;

  })(G.Gremlin);

  G.add("Espresso", Espresso);

}).call(this);
