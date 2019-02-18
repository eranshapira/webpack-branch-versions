const express = require('express')
const app = express()
const port = 3000

let branchVersion = undefined;
app.get('/setVersion', (req, res) => {
    branchVersion = req.query.branchVersion;
    res.send(JSON.stringify({
        branchVersion
    }));
});
app.get('/', (req, res) => res.send(`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Branch version server</title>
  </head>
  <body>
  <script type="text/javascript" src="${branchVersion}main.js"></script></body>
</html>
`))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))