// Load the http module to create an http server.
import http from 'http';
import dotenv from 'dotenv';
import greeting from './greeting.js';

dotenv.config();

const port = process.env.PORT;
// Configure our HTTP server to respond with Hello World to all requests.
const server = http.createServer((req, res) => {

  const default_lang = 'en';
  const response={
    lang: default_lang,
    message: greeting[default_lang],
  };
  const lang = req.headers['accept-language'];
  const message = greeting[lang];
  if (message){
    response.lang= lang;
    response.message = message;
  }
  res.writeHead(200, {'Content-Type': 'text/plain',
                      'Content-Language': response.lang});
  res.end(response.message);
});

server.listen(port);

// Put a friendly message on the terminal
console.log(`Server running at ${port}`);
