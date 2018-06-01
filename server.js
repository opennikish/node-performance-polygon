const http = require('http');

const {
  blockMainThreadHandler,
  leakHandler,
  homeHandler  
} = require('./handlers');

const { makeRouter, RouteError } = require('./router');


const port = 7777;
const hostname = '127.0.0.1';

const server = http.createServer(handler);

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const config = {
  leakSize: 1000000,
  iterationSize: 1000,
};

// @todo: Move out
const route = makeRouter({
  '/leak': leakHandler(config.leakSize),
  '/block': blockMainThreadHandler(config.iterationSize),
  '/': homeHandler()
});

function handler(req, res) {  
  res.setHeader('Content-Type', 'text/plain');    
  let statusCode = 200;

  try {
    route(req, res);    
  } catch (error) {
    onError(error);
    statusCode = 500;
  } 
  
  res.statusCode = statusCode;
  res.end(null);  
}

function onError(error, defaultMessage = 'Something went wrong.') {
  return (req, res) => {
    const userErrorMessage = defaultMessage;
    console.log(e.message || userErrorMessage);

    res.write(defaultMessage);    
  };
}
