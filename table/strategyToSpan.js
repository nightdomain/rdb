var newCollection = require('../newCollection');

function toSpan(table,strategy) {
	var span = {};
	span.legs = newCollection();
	span.table = table;
	applyStrategy(table,span.legs,strategy);
	return span;

	function applyStrategy(table,legs,strategy) {
		if(!strategy) 
			return;		
		for (var name in strategy) {				
			addLeg(legs,table,strategy,name);			
		}					
	}	
			
	function addLeg(legs,table,strategy,name) {
		var relation = table._relations[name];
		var leg = relation.toLeg();
		legs.add(leg);		
		var subStrategy = strategy[name];
		var childTable = relation.childTable;
		applyStrategy(childTable,leg.span.legs,subStrategy);
	}
}

module.exports = toSpan;