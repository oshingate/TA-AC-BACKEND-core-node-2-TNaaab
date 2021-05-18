let http = require('http');
let fs = require('fs');

function handleServer(req, res) {
  let final = '';
  req.on('data', (chunk) => {
    final = final + chunk;
  });
  req.on('end', () => {
    console.log(final);
    res.setHeader('Content-Type', 'application/json');
    res.write(final);
    res.end();
  });
}

let server = http.createServer(handleServer);

server.listen(3456, () => {
  console.log('server is live on 3456');
});
