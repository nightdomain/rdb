var newManyLeg = require('./relation/newManyLeg');
var newManyCache = require('./relation/newManyCache');
var newForeignKeyFilter = require('./relation/newForeignKeyFilter');
var newExpanderCache = require('./relation/newExpanderCache');

function newManyRelation(joinRelation) {
    var c = {};

    var manyCache = newManyCache(joinRelation);
    var expanderCache = newExpanderCache(joinRelation);

    c.joinRelation = joinRelation;
    c.childTable = joinRelation.parentTable;
    var parentTable = joinRelation.childTable;

    c.accept = function(visitor) {
        visitor.visitMany(c);
    };

    c.getRows = function(parentRow) {
        if (expanderCache.tryGet(parentRow))
            return manyCache.tryGet(parentRow);
        var filter = newForeignKeyFilter(joinRelation, parentRow);
        var result = c.childTable.getManySync(filter);
        expanderCache.add(parentRow);
        return result;
    };

    c.expand = expanderCache.add;

    c.toLeg = function() {
        return newManyLeg(c);
    };

    return c;
};

module.exports = newManyRelation;