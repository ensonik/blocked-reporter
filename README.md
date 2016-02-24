[![NPM](https://nodei.co/npm/blocked-dogstatsd-reporter.png)](https://npmjs.org/package/blocked-dogstatsd-reporter)

Uses [Blocked](https://www.npmjs.com/package/blocked) to report stats through [node-dogstatsd](https://www.npmjs.com/package/node-dogstatsd).

# Importing

```
"blocked-dogstatsd-reporter": "1.2.2"
```


# Usage

```
var DD = require("node-dogstatsd").StatsD;

var BlockedReporter = require("blocked-reporter");
new BlockedReporter({
    "dogstatsd":new DD()
}).start();
```     
        
       
Options include:
 
* dogstatsd: A new instance of node-dogstatsd. Defaults to a new instance configured for localhost:8125.
* datadogMetricName : The metric name used in Datadog. Defaults to "event-loop-blocked".
* histogramInterval : The histogram interval. Defaults to 10.
* triggerThreshold : The threshold at which the Blocked callback will trigger a dogstatsd call. Defaults to 10ms.
   
   
```    
    var BlockedReporter = require("blocked-reporter");  
      
    new BlockedReporter({
        "dogstatsd":new DD(),
        "datadogMetricName":"event-loop-blocked",
        "histogramInterval":20       
    }).start();
```
    
_Don't forget to call `start`_

### Event

A 'started' event will be emited when blocked-reporter has properly started.

```
    var BlockedReporter = require("blocked-reporter");  
          
    var br = new BlockedReporter();
    br.on('started', function(data){
        console.log("Blocked reporter has started");
    });
    br.start();
```

# License

ISC