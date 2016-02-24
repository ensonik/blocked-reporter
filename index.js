"use strict";

const blocked = require('blocked');
const StatsD = require('node-dogstatsd').StatsD;
const EventEmitter = require('events').EventEmitter;
const util = require('util');

class BlockedReporter {

    constructor(options) {
        options = options || {};

        this.dogstatsd = options.dogstatsd || new StatsD();
        this.datadogMetricName = options.datadogMetricName || "event-loop-blocked";
        this.histogramInterval = options.histogramInterval || 1;
        this.triggerThreshold = options.triggerThresholdMs || 10;

        EventEmitter.call(this);
        util.inherits(BlockedReporter, EventEmitter);
    }

    start() {
        let self = this;

        let cb = function(ms){
            self.dogstatsd.histogram(
                self.datadogMetricName,
                ms,
                self.histogramInterval,
                self.dogstatsd.global_tags
            );
        };

        blocked(cb, {threshold:this.triggerThreshold});

        this.emit('started', "Blocked has started");
    }

};

module.exports = BlockedReporter;