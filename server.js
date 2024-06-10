const http = require('http');
const fs = require('fs');
const path = require('path');

const EventEmitter = require('events');
const { error } = require('console');
class MyEmitter extends EventEmitter {};
const myEmitter = new EventEmitter();

myEmitter.on('route', (url) => {
    const d = new Date();
    if(DEBUG) console.log(`Route Event on: ${url} at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
        fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'route.log'), `Route Event on: ${url} at ${d}`)
    if(error) throw error;
});


global.DEBUG = true;

const server = http.createServer((request, response) => {
  if(DEBUG) console.log('Request Url:', request.url);
  let path = './views/';
  switch(request.url) {
    case '/':
      path += 'index.html';
      if(DEBUG) console.log(path);
      route.indexPage(path, response);
      myEmitter.emit('route', path);
      break;
    case '/about':
      path += 'about.html';
      if(DEBUG) console.log(path);
      route.aboutPage(path, response);
      myEmitter.emit('route', path);
      break;
    case '/home':
      path += 'home.html';
      if(DEBUG) console.log(path);
      route.homePage(path, response);
      myEmitter.emit('route', path);
      break;
    default:
      if(DEBUG) console.log('404 Not Found');
      myEmitter.emit('error', '404 Not Found');
      response.writeHead(404, { 'Content-Type': 'text/plain' });
      response.end('404 Not Found');
      break;
  }
});

server.listen(3000, () => {
  console.log('Server is running...');
});