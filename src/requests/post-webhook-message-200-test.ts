import { sleep, check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";

export let options: Options = {
  vus: 1,
  duration: "5s",
};

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
  const url = "https://gateway.loadtest.zeals.app/v1/webhook/line";
  const res = http.post(url, JSON.stringify(body), { headers: { 'Content-Type': 'application/json' }});
  check(res, {
    "status is 200": () => res.status === 200,
  });
  sleep(1);
};
