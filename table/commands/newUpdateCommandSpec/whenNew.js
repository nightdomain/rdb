var when = require('a').when;
var c = {};

when(c)
.it('should set column on ColumnList with alias').assertEqual(c.column, c.columnList[c.alias])
	.it('should set parameters').assertEqual(c.parameters, c.sut.parameters)
	.it('should set sql').assertEqual(c.sql, c.sut.sql())	
	;
