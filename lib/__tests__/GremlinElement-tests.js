var GremlinElement = require('../GremlinElement');

describe('GremlinElement', function () {

	it('creates custom elements', function () {
		expect(GremlinElement.register).to.be.a('function');
		expect(function () {
			GremlinElement.register('foo');
		}).to.throw();

		var El = GremlinElement.register('gremlin-element-test-gremlin');
		var el = document.createElement('gremlin-element-test-gremlin');
		expect(El).to.be.a('function');
		expect(el).to.be.a(HTMLElement);
		expect(el.tagName.toUpperCase()).to.equal('gremlin-element-test-gremlin'.toUpperCase());
	});

});