import * as fs from "node:fs";

try {
const data = "Hello node js"
fs.writeFile('message.txt', data, function(error) {
  if (error) {
      console.error("a problem ocurred, this is the error", error.message);
      return;}

  console.log("file writed succesfully, this is the message:", data);
}); 
} catch (error) {
  console.error("An error occurred before writing the file:", error.message);
}