function act(c) {
	c.expected = "select _0.oOrderId,_0.oCustomerId from order _0 where _0.oOrderId=2 AND _0.discriminatorColumn='foo' AND _0.discriminatorColumn2='baz'";
	c.filter = c.orderTable.customer.name.eq('lars');	
	c.newQuery();
	
}

module.exports = act;