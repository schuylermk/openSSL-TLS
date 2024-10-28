const tls = require("node:tls");
const fs = require("fs");

// Specify the server options and use the same certificate to verify
const options = {
  ca: [fs.readFileSync("./TLS-voyage-maiden/server-cert-ejemplo.pem")], // Load the server's certificate for verification
};

// Connect to the server
const client = tls.connect(8000, "localhost", options, () => {
  console.log("Connected to the server");

  // Send a message to the server
  client.write("Hello, mein secure server!");
});

// Log any data received from the server
client.on("data", (data) => {
  console.log("Received from server:", data.toString());
  client.end(); // Close the connection after receiving the response
});

// Handle connection close
client.on("end", () => {
  console.log("Disconnected from the server");
});
