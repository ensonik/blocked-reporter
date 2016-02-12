"use strict";

const blocked = require('blocked');
var StatsD = require('node-dogstatsd').StatsD;

class BlockedReporter {

    constructor(options) {
        options = options || {};

        this.dogstatsd = options.dogstatsd || new StatsD();
        this.datadogMetricName = options.datadogMetricName || "event-loop-blocked";
        this.histogramInterval = options.histogramInterval || 1;
        this.triggerThreshold = options.triggerThresholdMs || 10;
    }

    start() {
        var msg = 'Event loop blocked';
        var self = this;

        var cb = function(ms){
            self.dogstatsd.histogram(
                self.datadogMetricName,
                ms,
                self.histogramInterval,
                self.dogstatsd.global_tags
            );
        };

        blocked(cb, {threshold:this.triggerThreshold});
    }

};

module.exports = BlockedReporter;