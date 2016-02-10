"use strict";

class BlockedReporter {

    constructor(options) {
        var config = new Object();

        config.dogstatsd = options.dogstatsd;
        config.datadogMetricName = options.datadogMetricName || "event-loop-blocked";
        config.histogramInterval = options.histogramInterval || 1;
        config.triggerThreshold = options.triggerThresholdMs || 10;

        this.config = config;
    }

    start() {
        var msg = 'Event loop blocked';
        var self = this;

        var blocked = function(fn, ts) {
            var start = process.hrtime()
            var interval = 100;

            setInterval(function(){
                var delta = process.hrtime(start);
                var nanosec = delta[0] * 1e9 + delta[1];
                var ms = nanosec / 1e6;
                var n = ms - interval;
                if (n > ts) fn(Math.round(n))
                start = process.hrtime();
            }, interval).unref();
        };

        blocked(function(ms){
            self.config.dogstatsd.histogram(self.config.datadogMetricName, ms, self.config.histogramInterval, self.config.dogstatsd.global_tags);
        }, this.config.triggerThreshold);
    }
};

module.exports = BlockedReporter