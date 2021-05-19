let http = require('http');
let fs = require('fs');
let qs = require('querystring');

function handleServer(req, res) {
  if (req.method === 'GET' && req.url === '/form') {
    res.setHeader('Content-Type', 'text/html');
    fs.createReadStream('./form.html').pipe(res);
  } else if (req.method === 'POST' && req.url === '/form') {
    console.log('post');
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      let dataObject = qs.parse(data);
      console.log(dataObject);
      res.end(JSON.stringify(dataObject));
    });
  }
}

let server = http.createServer(handleServer);
server.listen(5678, () => {
  console.log('server is live on port 5678');
});
