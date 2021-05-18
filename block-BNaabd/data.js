let http = require('http');
let qs = require('querystring');

function handleServer(req, res) {
  let final = '';
  let type = req.headers['content-type'];
  req.on('data', (chunk) => {
    final = final + chunk;
  });
  req.on('end', () => {
    if (
      req.method === 'POST' &&
      type === 'application/json' &&
      req.url === '/json'
    ) {
      res.end(final);
    } else if (
      req.method === 'POST' &&
      type === 'application/x-www-form-urlencoded' &&
      req.url === '/form'
    ) {
      let parsedData = qs.parse(final);
      res.end(JSON.stringify(parsedData));
    }
  });
  console.log(type);
}

let server = http.createServer(handleServer);

server.listen(7000, () => {
  console.log('started on 7000');
});
