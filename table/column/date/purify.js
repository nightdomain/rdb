var tryParseISO = require('./tryParseISO');

function purify(value) {			
	if(value == null)
		return null;	

	if (value.toISOString) 
		return new Date(value);

	var iso = tryParseISO(value);
	if (iso)
		return iso;	
	
	return new Date(value);
}

module.exports = purify;