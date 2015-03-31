//slightly modified code from github.com/brianc/node-postgres
var EventEmitter = require('events').EventEmitter;

var defaults = require('./defaults');
var genericPool = require('generic-pool');
var sqlite3 = require('sqlite3');
var mode = sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE;
var sqlite3 = sqlite3.verbose();

function newSqlitePool(connectionString, poolOptions) {
    poolOptions = poolOptions || {};
    var pool = genericPool.Pool({
        max: poolOptions.size || poolOptions.poolSize || defaults.poolSize,
        idleTimeoutMillis: poolOptions.idleTimeout || defaults.poolIdleTimeout,
        reapIntervalMillis: poolOptions.reapIntervalMillis || defaults.reapIntervalMillis,
        log: poolOptions.log || defaults.poolLog,
        create: function(cb) {
            var client = new sqlite3.Database(connectionString, mode, function(err) {
                if (err) return cb(err, null);
                client.poolCount = 0;
                return cb(null, client);
            });
        },
        destroy: function(client) {
            client._destroying = true;
            client.poolCount = undefined;
            client.close();
        }
    });
    //mixin EventEmitter to pool
    EventEmitter.call(pool);
    for (var key in EventEmitter.prototype) {
        if (EventEmitter.prototype.hasOwnProperty(key)) {
            pool[key] = EventEmitter.prototype[key];
        }
    }
    //monkey-patch with connect method
    pool.connect = function(cb) {
        var domain = process.domain;
        pool.acquire(function(err, client) {
            if (domain) {
                cb = domain.bind(cb);
            }
            if (err) return cb(err, null, function() { /*NOOP*/ });
            client.poolCount++;
            cb(null, client, function(err) {
                if (err) {
                    pool.destroy(client);
                } else {
                    pool.release(client);
                }
            });
        });
    };
    return pool;
}

module.exports = newSqlitePool;
