import { sleep, check, group } from 'k6';
import http from 'k6/http';

export let options = {
  vus: 50,
  duration: '10s'
};

const CHANNEL_ID = "32423423423";

export default () => {
  const body = {
    destination: "U93a64328bf110467dc72e6fab8218ad1",
    events: [
      {
        replyToken: "0f3779fba3b349968c5d07db31eab56f",
        type: "message",
        mode: "active",
        timestamp: new Date().getTime(),
        source: {
          type: "user",
          userId: "U424c58ec97399e5c179cf15d1a648409",
        },
        webhookEventId: "01FZ74A0TDDPYRVKNK77XKC3ZR",
        deliveryContext: {
          isRedelivery: false,
        },
        message: {
          id: "325708",
          type: "text",
          text: "Hello, world",
        },
      },
    ],
  };
  const url = `https://gateway.loadtest.zeals.app/v1/webhook/line?channel_id=${CHANNEL_ID}`;
  const res = http.post(url, JSON.stringify(body), { headers: { 'Content-Type': 'application/json' }});
  check(res, {
    "status is 200": () => res.status === 200,
  });
  sleep(1);
};
