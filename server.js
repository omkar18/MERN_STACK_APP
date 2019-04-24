const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/keys');
const items = require('./routes/api/items')

const app = express();

//BodyParser Middleware
app.use(bodyParser.json());

//DB connection
mongoose.connect(config.mongoURI, {useNewUrlParser: true});
mongoose.connection.on('connected', ()=>{
  console.log('db connected successfully');
})

mongoose.connection.on('error', (error)=>{
  console.log({ERROR: error})
})

app.use('/api/items', items);

const port = process.env.PORT || 4000;
app.listen(port, ()=>{
console.log(`Server connected on ${port}`)
})