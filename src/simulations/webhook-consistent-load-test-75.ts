import { group } from "k6";
import get200StatusTest from "../requests/get-200-status-test";
import post400StatusTest from "../requests/post-400-status-test";
import postFileTest from "../requests/post-file-test";

// After both the maximum capacity and consistent load tests have been run, create a 
// baseline test that stresses the system without running the maximum system load. The baseline 
// test is recommended to be run at 75% of the maximum capacity for a period of two hours.
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
