var _newCache = require('../newCache');

function getCache(id) {
	domain = process.domain;
	return domain[id] || newCache();	

	function newCache() {
		var cache = _newCache();
		domain[id] = cache;
		return cache;
	}
}



module.exports = getCache;