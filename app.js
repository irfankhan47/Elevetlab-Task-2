const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { id: 1, name: 'Irfan' },
  { id: 2, name: 'Ayesha' },
];

// Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Add a new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Home route
app.get('/', (req, res) => {
  res.send('User Management API - CI/CD by Jenkins');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
