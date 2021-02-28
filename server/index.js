
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require ('path');
const cors = require('cors');
const passport = require('passport')


const app = express();

//Middlewares
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cors());

//setting up the static directory
app.use(express.static(path.join(__dirname, 'public')));

//Use passport middleware
app.use(passport.initialize());
//Bring in the Passport Strategy
require ('./config/passport')(passport);
app.use(passport.session()) 


//Bring in the Database Config and connect with the database
const db = require('./config/keys').mongoURI;
mongoose.connect (db, {
    useNewUrlParser: true
}).then(() => {
    console.log (`Database connected seccessfully ${db}`)
}).catch (err => {
    console.log (`Unable to connect with the database ${error.message}`)
})

//Bring in the Users and Posts route
const users = require ('./routes/api/users');
app.use ('/api/users', users);
const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

const PORT = process.env.PORT || 3000

app.listen (PORT, () => {
    console.log (`Server started on port ${PORT}`);
});


