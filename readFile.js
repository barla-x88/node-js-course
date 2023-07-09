import fs from "fs";

// Non-blocking, asynchronous way
const fileContent = fs.readFile(
  "./textfile.txt",
  { encoding: "utf-8" },
  (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
  }
);
