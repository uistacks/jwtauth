const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/db');
const path = require('path');

const users = require('./routes/user');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err) }
);

const app = express();
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

app.use(express.static('frontend/public'));

// app.get('/', (req, res) => {
//     res.send('Hello');
// });
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../frontend/public/index.html'), function(err) {
        if (err) {
            res.status(500).send(err)
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});