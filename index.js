const express = require('express')
const app = express()
var ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')

app.set('view engine', 'ejs');
app.use(ejsLayouts);

//body-parser middleware //makes req.body in app.post() work
app.use(express.urlencoded({extended: false}))

//home render
app.get('/', (req, res) => {
    res.render('home');
  });

//controllers routes
app.use('/dinosaurs', require('./controllers/dinos.js'))
app.use('/prehistoric_creatures', require('./controllers/creatures.js'))


app.listen(8000, ()=> {
    console.log('Listening')
})