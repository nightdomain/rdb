function purify(value) {		
	
	if(value == null)
		return null;

	if (value.toISOString))
		return value.toISOString()
	return value;
}

module.exports = purify;