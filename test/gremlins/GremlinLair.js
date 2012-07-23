define([
    "jquery",
    "gremlinjs/gremlins/GremlinLair"
], function ($, Lair) {
    return function () {
        module("gremlinjs/gremlins/GremlinLair");
        var name = "myGremlin",
            id = 0,
            $gremlin = $("<div id='mygremlin'></div>"),
            Gremlin = Lair.create(name, {}),
            gremlin;

        $('body').append($gremlin);
        gremlin = new Gremlin($gremlin, $gremlin.data(), id);

        test("Gremlin classes can be created", function () {
            strictEqual(typeof Gremlin, "function", "Class created");
            throws(function () {
                var test2 = Lair.create();
            }, "Name and mixin are mandatory");
            throws(function () {
                var test2 = Lair.create("name");
            }, "Name and mixin are mandatory");
            throws(function () {
                var test2 = Lair.create({});
            }, "Name and mixin are mandatory");
            throws(function () {
                var test2 = Lair.create(null, {});
            }, "Name and mixin are mandatory");
        });
        test("Gremlin classes can be instantiated", function () {
            strictEqual(typeof gremlin, "object", "class instance created");
        });
        test("The constants are there", function () {
            strictEqual(typeof gremlin.NOTIFICATION, "string", "notification event name");
            strictEqual(typeof gremlin.CONTENT_CHANGED, "string", "content changed event name");
        });
        test("The gremlin has default properties", function () {
            strictEqual(typeof gremlin.view, "object", "gremlin.view is an object");
            strictEqual(typeof gremlin.view.jquery, "string", "gremlin.view is a jquery object");
            strictEqual(gremlin.view.attr("id"), $gremlin.attr("id"), "gremlin.view references the correct jquery object");
            deepEqual(gremlin.data, $gremlin.data(), "gremlin.data is the correct data object");
            strictEqual(gremlin.id, id, "gremlin.id is the correct id");
        });
        test("gremlins have a name", 1, function () {
            strictEqual(gremlin.name, name, "the gremlins name is there");
        });
        asyncTest("pseudo-constructor", 2, function () {
            var g, G = Lair.create("aname", {
                initialize : function () {
                    ok(true, "initialize called");
                    strictEqual(this.id, 1, "correct id");
                    start();
                }
            });
            g = new G($('<div></div>'), {}, 1);
        });
        test("jquery elements are bound", function () {
            var g, G = Lair.create("aname", {
                elements : {
                    "foo" : ".foo",
                    "bar" : ".bar",
                    "foobar" : ".foobar"
                }
            });
            g = new G($('<div><span class="foo"></span><span class="bar"></span></div>'), {}, 1);
            strictEqual(typeof g.foo, "object", ".foo found");
            strictEqual(typeof g.foo.jquery, "string", "foo is a jquery object");
            strictEqual(g.foo.length, 1, "with length 1");
            strictEqual(typeof g.bar, "object", ".bar found");
            strictEqual(typeof g.bar.jquery, "string", "bar is a jquery object");
            strictEqual(g.bar.length, 1, "with length 1");
            strictEqual(typeof g.foobar, "object", ".foobar found");
            strictEqual(typeof g.foobar.jquery, "string", "foobar is a jquery object");
            strictEqual(g.foobar.length, 0, "with length 0");
            throws(function () {
                var g2, G2 = Lair.create("aname", {
                    elements : {
                        foo : function () {
                        }
                    }
                });
                g2 = new G2($('<div><span class="foo"></span><span class="bar"></span></div>'), {}, 1);

            }, "elements selector has to be a string");
            throws(function () {
                var g2, G2 = Lair.create("aname", {
                    elements : {
                        foo : ".bar"
                    },
                    foo : "bar"
                });
                g2 = new G2($('<div><span class="foo"></span><span class="bar"></span></div>'), {}, 1);

            }, "element member must not be defined");
        });
        asyncTest("jquery events are bound", function () {
            var g, G;

            G = Lair.create("aname", {
                events : {
                    "handle1" : "click .foo"
                }
            });
            throws(function () {
                g = new G($('<div></div>'), {}, 1);
            }, "event handlers have to be defined");

            G = Lair.create("aname", {
                events : {
                    "handle1" : function () {
                    }
                }
            });
            throws(function () {
                g = new G($('<div></div>'), {}, 1);
            }, "event selectors have to be referenced by strings");

            G = Lair.create("aname", {
                elements : {
                    "foo" : ".foo"
                },
                events : {
                    "handleSelf" : "click",
                    "handle1" : "click .foo",
                    "handle2" : "keyup .bar",
                    "handle3" : "mousemove .foobar"
                },
                initialize : function () {
                    this.foo.append('<span id="foobar" class="foobar"></span>');
                },
                handleSelf : function (e) {
                    ok(this instanceof G, "context bound to gremlin instance");
                    strictEqual(e.currentTarget.id, this.view.attr("id"), "view clicked");
                    this.foo.click();
                },
                handle1 : function (e) {
                    e.stopPropagation();
                    ok(this instanceof G, "context bound to gremlin instance");
                    strictEqual(e.currentTarget.id, this.foo.attr("id"), "#foo clicked");
                    this.view.find('.bar').keyup();
                },
                handle2 : function (e) {
                    e.stopPropagation();
                    strictEqual(e.currentTarget.id, "bar", "#bar keyup");
                    this.view.find('.foobar').mousemove();
                },
                handle3 : function (e) {
                    e.stopPropagation();
                    strictEqual(e.currentTarget.id, "foobar", "#foobar mousemove");
                    start();
                }
            });
            g = new G($('<div id="me"><span id="foo" class="foo"></span><span id="bar" class="bar"></span></div>'), {}, 1);
            g.view.click();
        });
        asyncTest("Interests", function () {
            var N_1 = "n1",
                N_2 = "n2",
                N_3 = "n3",
                N_4 = "n4",
                n1 = false,
                n2 = false,
                n3 = false,
                n4 = false,
                G1 = Lair.create("g1", {
                    interests : [N_1, N_2, N_3],
                    inform : function (type, data) {
                        switch (type) {
                            case N_1:
                                n1 = true;
                                strictEqual(data.foo, "bar", "interest 1 catched");
                                g2.two();
                                break;
                            case N_2:
                                n2 = true;
                                strictEqual(data.bar, "foo", "interest 2 catched");
                                g2.three();
                                break;
                            case N_3:
                                n3 = true;
                                strictEqual(data.foobar, "barfoo", "interest 3 catched");
                                this.chatter(N_4, {foo : "bar"});
                                break;
                            default:
                                break;
                        }
                    }
                }),
                G2 = Lair.create("g2", {
                    interests : [N_4],
                    inform : function (type, data) {
                        switch (type) {
                            case N_4:
                                n4 = true;
                                strictEqual(data.foo, "bar", "interest 4 catched");
                                ok(n1 && n2 && n3 && n4, "all notifications arrived");
                                start();
                                break;
                            default:
                                break;
                        }
                    },
                    one : function () {
                        this.chatter(N_1, {foo : "bar"});
                    },
                    two : function () {
                        this.chatter(N_2, {bar : "foo"});
                    },
                    three : function () {
                        this.chatter(N_3, {foobar : "barfoo"});

                    }
                });
            g1 = new G1($('<div></div>'), {}, 2);
            g2 = new G2($('<div></div>'), {}, 3);
            g2.one();

        });
        asyncTest("html change event available", 2, function () {
            var G = Lair.create("g", {
                    foo : function () {
                        this.view.text("bar");
                        this.triggerChange();
                    }
                }),
                g = new G($('<div></div>'), {}, 4);
            g.bind(g.NOTIFICATION, function (type, data) {
                strictEqual("bar", g.view.text(), "Content changed to bar");
                strictEqual(data.interest, g.CONTENT_CHANGED, "correct event triggered");
                start();
            });
            g.foo();

        });
    }

});