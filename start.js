const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')

const app = express()

app.use('/', express.static('public'))
app.set('view engine', 'ejs')

app.get('/contact', (req, res) => {
    // res.sendFile('public/pages/contact.html',{ root: __dirname })
    res.render('./basis/contact')
})

app.get('/upload-fileHTML', (req, res) => {
    res.render('./basis/upload')
})

const upload_path = '/uploads/'

app.post('/fileupload', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        // res.json({ fields, files });
        // oldpath : temporary folder to which file is saved to
        const oldpath = files.filetoupload.filepath;
        const newPath2 = path.join(__dirname, '/public/img/uploads')
        const newpath = newPath2 + '/' + files.filetoupload.originalFilename;
        // copy the file to a new location
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            // you may respond with another html page
            res.send('gelukt')
        });
    });
})

app.get('/ejs', (req, res) => {
    res.render('index', 
    {
        data: 'kareltje', 
        opties: ['eten','drinken']
    })
})  

const port = process.env.PORT || 3000
app.listen(port, () => { 
    console.log(`luisterd op poort ${port}`);
})