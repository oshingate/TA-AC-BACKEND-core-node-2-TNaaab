let http = require('http');
let fs = require('fs');

function handleServer(req, res) {
  fs.createReadStream('./readme.txt').pipe(res);
}

let server = http.createServer(handleServer);

server.listen(3000, () => {
  console.log('port no 3000');
});
