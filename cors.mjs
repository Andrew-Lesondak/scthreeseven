import { createServer } from "cors-anywhere";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: [],
  removeHeaders: ["cookie", "cookie2"]
}).listen(port, host, function() {
  console.log("Running CORS Anywhere on " + host + ":" + port);
});