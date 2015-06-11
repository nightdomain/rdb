var when = require('a').when;
var c = {};

when(c)
	.it('should return another object').assertNotEqual(c.date, c.sut)
	.it('should return iso in local timezone').assertEqual(c.iso, c.sut.toISOString())
	
	