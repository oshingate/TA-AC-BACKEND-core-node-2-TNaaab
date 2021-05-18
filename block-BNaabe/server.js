let http = require('http');
let qs = require('querystring');

function handleServer(req, res) {
  let final = '';
  req.on('data', (chunk) => {
    final = final + chunk;
  });
  req.on('end', () => {
    let type = req.headers['content-type'];
    if (
      req.url === '/' &&
      req.method === 'POST' &&
      type === 'application/json'
    ) {
      let jsonfinal = qs.parse(final);

      res.statuscode = 201;

      let email = JSON.stringify(jsonfinal.email);
      console.log(JSON.stringify(jsonfinal));
      //   res.setHeader('Content-Type', 'html');
      //   res.end(`<h1>${email}</h1>`);
    }
  });
}

let server = http.createServer(handleServer);

server.listen(3000, () => {
  console.log('server is on port 3000');
});
