const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Serve question.html for the root route first
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'question.html'));
});

// Serve static files from the 'public' directory for other routes
app.use(express.static(path.join(__dirname, 'public')));

// All other GET requests not handled will return the question page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'question.html'));
});

app.listen(PORT, () => {
  console.log(`Women's Day App is running on http://localhost:${PORT}`);
});
