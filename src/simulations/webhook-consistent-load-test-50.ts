import { group } from "k6";
import get200StatusTest from "../requests/get-200-status-test";
import post400StatusTest from "../requests/post-400-status-test";
import postFileTest from "../requests/post-file-test";

// Assuming the maximum capacity is determined, a consistent load test will be run. 
// The consistent load test will use a number of concurrent users equal to 50% of the 
// maximum capacity. As our system tends to have moderate usage from 11am to 11pm, 
// I recommend a load test of ~12 hours.
export default function () {
  group("Getting 200 status", () => {
    get200StatusTest();
  });
  group("Getting 400 status", () => {
    post400StatusTest();
  });
  group("Posting file status", () => {
    postFileTest();
  });
}
