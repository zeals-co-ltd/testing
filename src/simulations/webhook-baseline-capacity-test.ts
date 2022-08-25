import { group } from "k6";
import get200StatusTest from "../requests/get-200-status-test";
import post400StatusTest from "../requests/post-400-status-test";
import postFileTest from "../requests/post-file-test";

// Obtain a baseline benchmark for 10,000 webhooks of various event logs from 
// users over the course of 15 minutes
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
