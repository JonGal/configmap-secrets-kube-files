const express = require('express');
const crypto = require('crypto');
var fs = require('fs');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.write('Hello, World!\n and all the people in it!');
  res.end('Files!');
});

app.get('/ck_passwords', (req, res) => {
  fs.readFile('/usr/site/secret/secret.json', function (err, secret) {
    if (err) return console.log(err);

    const Username = JSON.parse(secret).USERNAME;
    const Password = JSON.parse(secret).PASSWORD;
    const Database = JSON.parse(secret).DATABASE;
    res.write('Usernmae: '+crypto.createHash('sha256').update(Username, 'utf8').digest("hex")+'\n');
    res.write('Password: '+crypto.createHash('sha256').update(Password, 'utf8').digest("hex")+'\n');
    res.write('Database: '+crypto.createHash('sha256').update(Database, 'utf8').digest("hex")+'\n');
    res.end(`\n`);
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
