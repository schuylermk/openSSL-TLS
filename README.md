Using [OpenSSL](https://www.openssl.org/), this project demonstrates a simple TLS client-server communication using [Node.js[(https://nodejs.org/). <br/><br/>
It includes a TLS server that listens for client connections and a TLS client that connects to the server, both using self-signed certificates for secure communication.  
<br/>

## Getting Started & Prerequisites <br/>

📌 &nbsp; Node.js Installed: You’ll need Node.js installed on your computer. <br/><br/>
📌 &nbsp; OpenSSL Installed: OpenSSL is used to generate the SSL certificate files.<br/>
<br/>

##### Here's one way how to install OpenSSL if you haven't already:
```bash
brew install openssl

# You may then need to do the ol'....

echo 'export PATH="/usr/local/opt/openssl@3/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc    

# ...or whatever your installer of choice might be.)
```
<br/>  

## Step One. Creating a Secure Server  

&nbsp; &nbsp; &nbsp; ...Aaaactually, first, in order to create a secure server, you’ll need an SSL certificate and a private key.  
<br/>

 1️⃣ &nbsp; Open your terminal. <br/>
 <br/>
 2️⃣ &nbsp; Run the following command to generate a self-signed certificate and private key
    
  ```bash
    openssl req -x509 -newkey rsa:4096 -keyout server-key.pem -out server-cert.pem -days 365 -nodes
  ```
  &nbsp; &nbsp; &nbsp; &nbsp; ☝️ Change the server-cert.pem and server-key.pem filenames to other names if you prefer)
<br/>

3️⃣ &nbsp; You’ll be prompted for information like your country, state, organization, etc. 
<br/> &nbsp; &nbsp; &nbsp; ...You can fill it out or just press Enter for each.
<br/>

This will create two files: <br/>
```bash
• ".../server-cert.pem"    // The SSL certificate
• ".../server-key.pem"     // The private key
```
<br/>

## Step Two. Create a TLS Server

Now we'll use Node.js to set up a basic TLS server.
<br/>
<br/>
 1️⃣ &nbsp; Create a new file called "tls-server.js" in a project folder. <br/>
 <br/>
 2️⃣ &nbsp; Copy the following code into tls-server.js:
```bash
const tls = require('node:tls');
const fs = require('fs');

// Load the certificate and private key
const options = {
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem')
};

// Create a TLS server
const server = tls.createServer(options, (socket) => {
  console.log('Client connected');
  
  // Send a message to the client
  socket.write('Hello from the secure server!\n');
  
  // Log any data received from the client
  socket.on('data', (data) => {
    console.log('Received from client:', data.toString());
  });
});

// Start the server on port 8000
server.listen(8000, () => {
  console.log('TLS server is running on port 8000');
});
```
<br/>


## Step Three. Create a TLS Client

Now, we create a client to connect to your TLS server.
<br/>
<br/>
 1️⃣ &nbsp; Create another file in the same folder, called tls-client.js. <br/>
 <br/>
 2️⃣ &nbsp; Copy the following code into tls-client.js:
 ```bash
const tls = require('node:tls');
const fs = require('fs');

// Specify the server options and use the same certificate to verify
const options = {
  ca: [ fs.readFileSync('server-cert.pem') ]  // Load the server's certificate for verification
};

// Connect to the server
const client = tls.connect(8000, 'localhost', options, () => {
  console.log('Connected to the server');

  // Send a message to the server
  client.write('Hello, secure server!');
});

// Log any data received from the server
client.on('data', (data) => {
  console.log('Received from server:', data.toString());
  client.end();  // Close the connection after receiving the response
});

// Handle connection close
client.on('end', () => {
  console.log('Disconnected from the server');
});
```
<br/>

3️⃣ &nbsp; Save the file.
<br/>
<br/>


## Step Four. Run the Server and Client
<br/>

 1️⃣ &nbsp; Run the server. <br/>
<br/>

 &nbsp; Open a terminal in your project directory and start the server with:
 ```bash
node tls-server.js
``` 
✅ If everything is set up right, the server will start and listen on port 8000.<br/>
 <br/>

And, in the terminal, you'll hopefully see something along the lines of...
 ```bash
Client connected
Received from client: Hello, secure server!
```
<br/>
 
 2️⃣ &nbsp; Now, run the client...
  <br/>
  
 &nbsp; Open another terminal in the same directory and run the client with:
 ```bash
node tls-client.js
```
 Again, if everything is set up correctly, the client will connect to the server, send a message, and log any data received from the server.<br/>
 
 ✅ You should see something like... <br/>
 ```bash
Connected to the server
Received from server: Hello from the secure server!
Disconnected from the server
```
<br/>

## How It Works

- The server loads its certificate and private key and creates a TLS server using these credentials.
- The client loads the server's certificate for verification and connects to the server.
- Once connected, the client sends a message to the server, and the server responds with a message.
- Both the client and server log any data they receive from each other.

## Notes

- This example uses self-signed certificates for simplicity. In a production environment, one should use certificates issued by a trusted Certificate Authority (CA).


## License

This project is licensed under the MIT License.


## Project Structure

- **tls-client.js**: TLS client that connects to the TLS server, sends a message, and logs any data received from the server.

- **tls-server.js**: TLS server that listens for client connections, sends a message to the client, and logs any data received from the client.


- **TLS-Voyage-Maiden-Privs/server-cert-ejemplo.pem**: The server's certificate for establishing a secure TLS connection.

- **TLS-Voyage-Maiden-Privs/server-key-ejemplo.pem**: The server's private key for establishing a secure TLS connection.
<br/>
