This module uses the https://www.npmjs.com/package/blocked package to report stats through 

# Importing

```
"blocked-reporter": "1.2.0"
```


# Usage

```
var DD = require("node-dogstatsd").StatsD;
var BlockedReporter = require("blocked-reporter");
new BlockedReporter({
    "dogstatsd":new DD()
}).start();
```     
        
       
Other options include:
 
* datadogMetricName : The metric name used in Datadog. Defaults to "event-loop-blocked"
* histogramInterval : The histogram interval. Defaults to 10
* triggerThreshold : The threshold at which the callback function is triggered
   
   
```    
    var Blocked = require("blocked-reporter");    
    new Blocked({
        "dogstatsd":new DD(),
        "datadogMetricName":"event-loop-blocked",
        "histogramInterval":1       
    }).start();
```
    
