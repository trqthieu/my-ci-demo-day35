const express = require('express');
const { isValidEmail, formatUser } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Mock database
const users = [
  { id: 1, name: 'john', email: 'john@example.com' },
  { id: 2, name: 'alice', email: 'alice@example.com' }
];

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CI Demo API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/users', (req, res) => {
  const formattedUsers = users.map(formatUser);
  res.json({
    count: formattedUsers.length,
    users: formattedUsers
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({
      error: 'User not found'
    });
  }

  res.json(formatUser(user));
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({
      error: 'Name and email are required'
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: 'Invalid email format'
    });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json(formatUser(newUser));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found'
  });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
