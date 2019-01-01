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
  res.write('Reporting Secrets\n');
  fs.readFile('./secret/secrets.json', function (err, secret) {
    if (err) {res.end('\n'); return console.log(err)};

    const Username = JSON.parse(secret).USERNAME ? JSON.parse(secret).USERNAME : console.log("No UserName");
    const Password = JSON.parse(secret).PASSWORD ? JSON.parse(secret).PASSWORD : console.log("No Password");
    const Database = JSON.parse(secret).DATABASE ? JSON.parse(secret).DATABASE : console.log("No Database");
    res.write('Username: '+crypto.createHash('sha256').update(Username, 'utf8').digest("hex")+'\n');
    res.write('Password: '+crypto.createHash('sha256').update(Password, 'utf8').digest("hex")+'\n');
    res.write('Database: '+crypto.createHash('sha256').update(Database, 'utf8').digest("hex")+'\n');
    res.end('\n');
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
