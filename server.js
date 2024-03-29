const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Log mongo queries being executed
mongoose.set('debug', true);

app.use(require('./routes'));
// app starts a server and listens on port 3001 for connections
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
