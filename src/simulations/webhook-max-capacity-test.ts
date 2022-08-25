import { group } from "k6";
import get200StatusTest from "../requests/get-200-status-test";
import post400StatusTest from "../requests/post-400-status-test";
import postFileTest from "../requests/post-file-test";

// Use the results from the "webhook-baseline-capacity-test" execution to make a guess as to how 
// many webhooks the system might support. 
// One possibility might be to run 800,000 different webhooks from 400,000 users through the system for 
// one hour.
//
// If the second execution continues to meet the performance goals outlined in section 7, continue 
// to run new tests with increasing quantities of concurrent users until the performance goals 
// are no longer met. It is desired that one server will support up to 800,000 concurrent users 
// (double the capacity which caused the original system crash described in  ).
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
