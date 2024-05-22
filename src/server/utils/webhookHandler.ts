// Function to handle the webhook logic
function webhookHandler(request: any, response: any) {
  let body = "";
  request.on("data", (chunk: any) => {
    body += chunk.toString(); // convert Buffer to string
  });
  request.on("end", () => {
    // Process the webhook payload
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Webhook processed\n");
  });
}

export { webhookHandler };
