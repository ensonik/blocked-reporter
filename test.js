'use strict';

var expect = require('chai').expect;
var StatsD = require('node-dogstatsd').StatsD;
var Blocked = require("./index");

describe('The reporter', function () {

    it('should load the datadog configuration', function (done) {
        new Blocked({
            "dogstatsd": new StatsD("localhost", 8125, null, {"global_tags": ["a:b", "c:d"]}),
            "triggerThresholdMs": 1
        }).start();

        var server = require('dgram').createSocket("udp4");
        server.bind(8125);
        server.on("message", function (msg, rinfo) {
            expect(msg.toString()).to.match(/event-loop-blocked:[0-9]\|h\|#a:b,c:d,a:b,c:/g);
            done();
        });

        setTimeout(function () {
            Array(100).join("a");
        }, 100);
    });

    it('should use the proper trigger threshold when not defined', function () {
        var blocked = new Blocked({});
        expect(blocked.config.triggerThreshold).to.equal(10);
    });

    it('should set default values', function () {
        var blocked = new Blocked({
                "datadogMetricName": "test",
                "histogramInterval": 2,
                "triggerThresholdMs": 222
        });

        expect(blocked.config.triggerThreshold).to.equal(222);
        expect(blocked.config.histogramInterval).to.equal(2)
        expect(blocked.config.datadogMetricName).to.equal("test")
    });

});
