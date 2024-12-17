A grade de eventos do azure no Kubernetes tem suporte apenas ao schema Cloud Events, suportando um schema de ate 1 mb:

```JSON
[{
       "specVersion": "1.0",
       "type" : "orderCreated",
       "source": "myCompanyName/us/webCommerceChannel/myOnlineCommerceSiteBrandName",
       "id" : "eventId-n",
       "time" : "2020-12-25T20:54:07+00:00",
       "subject" : "account/acct-123224/order/o-123456",
       "dataSchema" : "1.0",
       "data" : {
          "orderId" : "123",
          "orderType" : "PO",
          "reference" : "https://www.myCompanyName.com/orders/123"
      }
}]
```

