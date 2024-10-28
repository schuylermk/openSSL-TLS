const tls = require("node:tls");
const fs = require("fs");

// Load the certificate and private key
const options = {
  key: fs.readFileSync("./TLS-voyage-maiden/server-key-ejemplo.pem"),
  cert: fs.readFileSync("./TLS-voyage-maiden/server-cert-ejemplo.pem"),
};

// Create a TLS server
const server = tls.createServer(options, (socket) => {
  console.log("Client connected");

  // Send a message to the client
  socket.write("Hello from the secure server!\n");

  // Log any data received from the client
  socket.on("data", (data) => {
    console.log("Received from client:", data.toString());
  });
});

// Start the server on port 8000
server.listen(8000, () => {
  console.log("TLS server is running on port 8000");
});
