import { sleep, check, group } from 'k6';
import http from 'k6/http';

export let options = {
  vus: 50,
  duration: '10s'
};

export default () => {
  group("Getting 200 status from posting single webhook", () => {
  const res = http.get('https://test-api.k6.io');
  check(res, {
    'status is 200': () => res.status === 200,
  });
  sleep(1);
});
};
