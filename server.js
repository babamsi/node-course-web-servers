const express = require('express');
const fs = require('fs')
const port = process.env.PORT || 3000

var app = express();

app.set('view eingine', 'pug')



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) console.log('Unable to save your log')
        
    })
    console.log(log)
    next()
})

// app.use((req, res, next) => {
//     if (req.url !== '/' || req.url !== '/about') {
//         res.render('maintenance.pug')
//     } else {
//         next();
//     }
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('home.pug', {
        title: 'Home Page',
        name: 'Suhayb Cabdulahi',
        content: 'This is Home page And welcome it',
        year: new Date().getFullYear()
    })
})
app.get('/about', (req, res) => {
    // res.send('About paage')
    res.render('about.pug', {
        title: 'About page',
        content: 'This is my about page'

    })
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to find your data'
    })
})

app.listen(3000, () => {
    console.log(`Server running in port ${port}`)
});