const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Task 2 Completed');
});

app.get('/about', (req, res) => {
  res.send('About Page - Node.js App deployed using Jenkins and Docker.');
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
