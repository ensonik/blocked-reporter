This module uses the https://www.npmjs.com/package/blocked package to report stats to datadog.

# Usage


        var DD = require("node-dogstatsd").StatsD;
        ...
        require("blocked-reporter")({"dogstatsd":DD});
        
        
 Other options include:
 
   * datadogMetricName : defaults to "event-loop-blocked"
   * histogramInterval = defaults to 1
   * errorThreshold : defaults to 1500 ms
   * warnThreshold : defaults to 750 ms
   * debugThreshold : defaults to 500 ms
   
   
For example:
     
    require("blocked-reporter")(
        {
            "dogstatsd":DD,
            "datadogMetricName":"event-loop-blocked",
            "histogramInterval":1,
            "errorThreshold":2000       
        });
    
# Importing as a dependency

     "blocking-reporter": "https://github.com/worximity/blocking-reporter.git#v1.0.0"

# Building and publishing a new version

When you're ready to publish a new version of the module, make sure everything is added and commited, then:
 
     git tag v0.0.0 # Where 0.0.0 is replaced by the tag version you want to mark
     git push origin --tags