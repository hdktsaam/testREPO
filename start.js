const express = require('express')
const fileUpload = require('express-fileupload')
const path  = require('path')

const app = express()

app.use('/', express.static('public'))
app.set('view engine', 'ejs')

app.get('/contact', (req, res) => {
    // res.sendFile('public/pages/contact.html',{ root: __dirname })
    res.render('./basis/contact')
})

app.get('/ejs', (req, res) => {
    res.render('index', 
    {
        data: 'kareltje', 
        opties: ['eten','drinken']
    })
})  

// upload part

app.get('/upload-file', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

const port = process.env.PORT || 3000
app.listen(port, () => { 
    console.log(`luisterd op poort ${port}`);
})