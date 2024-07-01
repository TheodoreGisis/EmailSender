require('dotenv').config();

const express = require('express');
const http = require('http');
const path = require('path');
const emailRoutes = require('./routes/emailRoutes');

const app = express();

const port = process.env.PORT || 80;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use email routes
app.use('/api', emailRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Enhanced Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        error: err.message,
        details: err
    });
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
