const express = require('express');
const app = express();
const port = 3000;

// Middleware (logging)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to Irfan’s Node.js App deployed via Jenkins!');
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
