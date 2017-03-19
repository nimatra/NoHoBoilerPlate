const express = require('express');
const path = require('path');
const open = require('opn');
const exec = require('child_process').exec;

const baseDir = 'build';
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 8080;
const app = express();

exec('gulp build', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

app.use(express.static(path.join(__dirname, baseDir)));


app.get('/api/name', (req, res) => {
  res.send({
    website: 'NoHo',
    blogPost: true,
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './', baseDir, '/index.html'));
});

app.listen(port, () => {
  open(`http://localhost:${port}`);
});
