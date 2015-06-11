var toISOString = require('./toISOString');

function cloneDate (date) {
	date = new Date(date);
	date.toISOString = function()  {
		return toISOString(date);
	};
	return date;
}

module.exports = cloneDate;