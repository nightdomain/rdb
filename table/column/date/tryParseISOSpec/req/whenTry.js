var when = require('a').when;
var c = {};

when(c)
	.it('should return iso unchanged').assertEqual(c.iso, c.returned)
