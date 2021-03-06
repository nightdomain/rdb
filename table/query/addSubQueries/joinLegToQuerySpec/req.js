var a = require('a');
var requireMock = a.requireMock;
var mock = a.mock;

module.exports = function(c) {
	c.mock = mock;
	c.newShallowJoinSql = requireMock('../singleQuery/joinSql/newShallowJoinSql');
	c.addSubQueries = requireMock('../addSubQueries');
	c.newParameterized = requireMock('../newParameterized');
	c.sut = require('../joinLegToQuery');
}
