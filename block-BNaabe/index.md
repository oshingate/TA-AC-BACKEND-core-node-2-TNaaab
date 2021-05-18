## BLOCK-writeCode

#### Path

Q. Suppose we have 3 files inside a directory on desktop
The structure is

- node(folder) - app.js - server.js - index.html
  You are currently inside server.js

Write code to

- capture absolute path of `server.js`(itself)
- get absolute path of `app.js`
- get realtive path of `index.html`
- get absolute path of `index.html` using `path module`

```js
let path1 = __dirname + '/server.js';
let path2 = __dirname + '/app.js';
let path3 = './index.html';
let path4 = __dirname + '/index.html';
```

#### Capture data on server

Q. Create a server using http

- handle post method on '/' route
- send json data on it from postman

```js
// data format is
let http = require('http');
let data = {
  team: 'kxip',
  players: 18,
  captain: 'KL Rahul',
};

function handleServer(req, res) {
  if (req.url === '/' && req.method === 'POST') {
    res.end(JSON.stringify(data));
  }
}

let server = http.createServer(handleServer);

server.listen(3000, () => {
  console.log('server is on port 3000');
});
```

- capture data from request on server side using data and end event on request object
- when end event fires, send entire captured data in response with status code 201.

Q. Follow above steps with form data from postman instead of json data.

- once data has been captured, send only captain's name in response.

```js
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
      type === 'application/x-www-form-urlencoded'
    ) {
      let jsonfinal = qs.parse(final);
      //   console.log(jsonfinal.team);
      res.statuscode = 201;
      //   res.end(JSON.stringify(jsonfinal));
      res.end(JSON.stringify(jsonfinal.captain));
    }
  });
}

let server = http.createServer(handleServer);

server.listen(3000, () => {
  console.log('server is on port 3000');
});
```

Q. Create server which can handle both json/form data without specifying which format of data is being received.

- add listener on port 9000
- use `data/end` event to capture json/form data
- use `req.headers['Content-Type']` to check data format
- parse respective data format i.e. json/form
- send entire data in response
- data sent from postman should have fields:
  - city
  - state
  - country
  - pin

```js
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
      res.end(final);
    } else if (
      req.url === '/' &&
      req.method === 'POST' &&
      type === 'application/x-www-form-urlencoded'
    ) {
      let jsonfinal = qs.parse(final);

      res.statuscode = 201;
      res.end(JSON.stringify(jsonfinal));
    }
  });
}

let server = http.createServer(handleServer);

server.listen(9000, () => {
  console.log('server is on port 3000');
});
```

Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.

- format of json data is {name: your name, email: "", }
- Html response format is <h1>Name</h1><h2>email</h2>

```js
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
      type === 'application/x-www-form-urlencoded'
    ) {
      let jsonfinal = qs.parse(final);

      res.statuscode = 201;
      let name = JSON.stringify(jsonfinal.name);
      let email = JSON.stringify(jsonfinal.email);
      res.setHeader('Content-Type', 'html');
      res.end(`<h1>${name}</h1><h2>${email}</h2>`);
    }
  });
}

let server = http.createServer(handleServer);

server.listen(3000, () => {
  console.log('server is on port 3000');
});
```

Q. Follow above question with form data containing fields i.e name and email.

- Parse form-data using `querystring` module
- respond with HTML page containing only email from data in H2 tag.

#### Note:-

Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.

```js

```
