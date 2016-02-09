"use strict";

var log4js = require('log4js');
var logger = log4js.getLogger("[blocked]");

var blocked = require('blocked');

module.exports = function(options) {
    var dogstatsd = options.dogstatsd;
    var datadogMetricName = options.datadogMetricName || "event-loop-blocked";
    var histogramInterval = options.histogramInterval || 1;
    var errorThreshold = options.errorThresholdMs || 1500;
    var warnThreshold = options.warnThresholdMs || 750;
    var debugThreshold = options.debugThresholdMs || 500;

    logger.debug("Blocked reporter started");
    var msg = 'Event loop blocked';
    blocked(function(ms){
        dogstatsd.histogram(datadogMetricName, ms, histogramInterval, dogstatsd.global_tags);
        if (ms > errorThreshold) logger.error(msg, { ms: ms });
        else if (ms > warnThreshold) logger.warn(msg, { ms: ms });
        else if (ms > debugThreshold) logger.debug('Event loop blocked for %sms', ms | 0);
    });
};