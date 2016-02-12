'use strict';

var expect = require('chai').expect;
var StatsD = require('node-dogstatsd').StatsD;
var BlockedReporter = require("./index");

describe('The reporter', function () {

    it('should write a histogram event', function (done) {
        new BlockedReporter({
            "dogstatsd": new StatsD("localhost", 8125, null, {"global_tags": ["a:b", "c:d"]}),
            "triggerThresholdMs": 1
        }).start();

        this.server = require('dgram').createSocket("udp4");
        this.server.bind(8125);
        this.server.on("message", function (msg, rinfo) {
            expect(msg.toString()).to.match(/event-loop-blocked:[0-9]\|h\|#a:b,c:d,a:b,c:/g);
            done();
        });

        setTimeout(function () { new Array(100).join("a"); }, 100);
    });

    it('should configure the default trigger threshold when not defined in options', function () {
        var br = new BlockedReporter();
        expect(br.triggerThreshold).to.equal(10);
    });

    it('should keep values given in options and not set defaults', function () {
        var br = new BlockedReporter({
            datadogMetricName: "test",
            histogramInterval: 2,
            triggerThresholdMs: 222
        });

        expect(br.triggerThreshold).to.equal(222);
        expect(br.histogramInterval).to.equal(2);
        expect(br.datadogMetricName).to.equal("test");
    });

});
