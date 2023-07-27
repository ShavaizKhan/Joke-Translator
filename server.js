// server.js
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3306;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3306`);
});
