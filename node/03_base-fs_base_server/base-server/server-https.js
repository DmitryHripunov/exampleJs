const https = require('https');
const fs = require('fs');

const option = {
  key: fs.readFileSync('path/to/key.pem'),
  cert: fs.readFileSync('path/to/cert.rem'),
}

https
  .createServer(option, (res, req) => {
    const count = (visits.get(req.url) || 0) + 1;
    visits.set(req.url, count)
    res.end(`Visits to ${req.url} #${count}`);
  });

const PORT = 8000
server.listen(PORT, () => {
  console.log(` Listening to http://localhost:${PORT}`)
});