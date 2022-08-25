## Message Event

From gateway test

```json
{
  "destination": "U93a64328bf110467dc72e6fab8218ad1",
  "events":[{
    "replyToken": "0f3779fba3b349968c5d07db31eab56f",
    "type": "message",
    "mode": "active",
    "timestamp": 1462629479859,
    "source": {
      "type": "user",
      "userId": "U4af4980629"
    },
    "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
    "deliveryContext": {
      "isRedelivery": false
    },
    "message": {
      "id": "325708",
      "type": "text",
      "text": "Hello, world"
    }
  }]
}

```

```json
{
  "destination": "xxxxxxxxxx",
  "events": [
    {
      "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
      "type": "message",
      "mode": "active",
      "timestamp": 1462629479859,
      "source": {
        "type": "user",
        "userId": "U4af4980629..."
      },
      "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
      "deliveryContext": {
        "isRedelivery": false
      },
      "message": {
        "id": "325708",
        "type": "text",
        "text": "@example Hello, world! (love)",
        "emojis": [
          {
            "index": 23,
            "length": 6,
            "productId": "5ac1bfd5040ab15980c9b435",
            "emojiId": "001"
          }
        ],
        "mention": {
          "mentionees": [
            {
              "index": 0,
              "length": 8,
              "userId": "U850014438e..."
            }
          ]
        }
      }
    }
  ]
}
```

## Unsend Event

Unused

## Unfollow, Leave

Event object for when your LINE Official Account is blocked.
or
Somebody removes your chatbot from a chat

```json
{
  "destination": "xxxxxxxxxx",
  "events": [
    {
      "type": "unfollow",
      "mode": "active",
      "timestamp": 1462629479859,
      "source": {
        "type": "user",
        "userId": "U4af4980629..."
      },
      "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
      "deliveryContext": {
        "isRedelivery": false
      }
    }
  ]
}
```

```json
{
  "destination": "xxxxxxxxxx",
  "events": [
    {
      "type": "leave",
      "mode": "active",
      "timestamp": 1462629479859,
      "source": {
        "type": "group",
        "groupId": "C4af4980629..."
      },
      "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
      "deliveryContext": {
        "isRedelivery": false
      }
    }
  ]
}
```

## Follow, Join

Event object for when your LINE Official Account is added as a friend (or unblocked). You can reply to follow events.
Or
Our chatbot joins some chat

```json
{
  "destination": "xxxxxxxxxx",
  "events": [
    {
      "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
      "type": "join",
      "mode": "active",
      "timestamp": 1462629479859,
      "source": {
        "type": "group",
        "groupId": "C4af4980629..."
      },
      "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
      "deliveryContext": {
        "isRedelivery": false
      }
    }
  ]
}
```

```json
{
  "destination": "xxxxxxxxxx",
  "events": [
    {
      "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
      "type": "follow",
      "mode": "active",
      "timestamp": 1462629479859,
      "source": {
        "type": "user",
        "userId": "U4af4980629..."
      },
      "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
      "deliveryContext": {
        "isRedelivery": false
      }
    }
  ]
}
```

## Postback

```json
{
  "destination": "xxxxxxxxxx",
  "events": [
    {
      "replyToken": "b60d432864f44d079f6d8efe86cf404b",
      "type": "postback",
      "mode": "active",
      "source": {
        "userId": "U91eeaf62d...",
        "type": "user"
      },
      "timestamp": 1513669370317,
      "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",
      "deliveryContext": {
        "isRedelivery": false
      },
      "postback": {
        "data": "storeId=12345",
        "params": {
          "datetime": "2017-12-25T01:00"
        }
      }
    }
  ]
}
```
