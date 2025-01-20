O Host.json é um arquivo de configuração que serve para tratar configurações que serão aplicadas a todas as funções da aplicação.

```JSON
{
  "version":  "2.0",
  "aggregator": {
    "batchSize":  1000,
    "flushTimeout":  "00:00:30"
  },
  "concurrency": {
    "dynamicConcurrencyEnabled":  true,
    "snapshotPersistenceEnabled":  true
  },
  "extensions": {
    "blobs": {},
    "cosmosDb": {},
    "durableTask": {},
    "eventHubs": {},
    "http": {},
    "queues": {},
    "sendGrid": {},
    "serviceBus": {}
  },
  "extensionBundle": {
    "id":  "Microsoft.Azure.Functions.ExtensionBundle",
    "version":  "[4.0.0, 5.0.0)"
  },
  "functions": [
    "QueueProcessor",
    "GitHubWebHook"
  ],
  "functionTimeout":  "00:05:00",
  "healthMonitor": {
    "enabled":  true,
    "healthCheckInterval":  "00:00:10",
    "healthCheckWindow":  "00:02:00",
    "healthCheckThreshold":  6,
    "counterThreshold":  0.80
  },
  "logging": {
    "fileLoggingMode":  "debugOnly",
    "logLevel": {
      "Function.MyFunction":  "Information",
      "default":  "None"
    },
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled":  true,
        "maxTelemetryItemsPerSecond"  :  20,
        "evaluationInterval":  "01:00:00",
        "initialSamplingPercentage":  100.0,
        "samplingPercentageIncreaseTimeout"  :  "00:00:01",
        "samplingPercentageDecreaseTimeout"  :  "00:00:01",
        "minSamplingPercentage":  0.1,
        "maxSamplingPercentage":  100.0,
        "movingAverageRatio":  1.0,
        "excludedTypes"  :  "Dependency;Event",
        "includedTypes"  :  "PageView;Trace"
      },
      "dependencyTrackingOptions": {
        "enableSqlCommandTextInstrumentation":  true
      },
      "enableLiveMetrics":  true,
      "enableDependencyTracking":  true,
      "enablePerformanceCountersCollection":  true,
      "httpAutoCollectionOptions": {
        "enableHttpTriggerExtendedInfoCollection":  true,
        "enableW3CDistributedTracing":  true,
        "enableResponseHeaderInjection":  true
      },
      "snapshotConfiguration": {
        "agentEndpoint":  null,
        "captureSnapshotMemoryWeight":  0.5,
        "failedRequestLimit":  3,
        "handleUntrackedExceptions":  true,
        "isEnabled":  true,
        "isEnabledInDeveloperMode":  false
      }
    }
  }
}

```
