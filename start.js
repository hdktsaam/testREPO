const express = require('express')
const fileUpload = require('express-fileupload')
const path  = require('path')
const fs = require('fs')

// importing middleware
const filesPayloadExists = require('./middleware/filesPayloadExists')
const fileSizeLimiter = require('./middleware/fileSizeLimiter')

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
    res.render("indexUpload")
})

// https://www.youtube.com/watch?v=4pmkQjsKJ-U

app.post('/upload', fileUpload({ createParentPath: true}),
    filesPayloadExists,
    fileSizeLimiter ,  
    (req, res) => {
        const files = req.files
        console.log(files);

        Object.keys(files).forEach(key => {
            // const filepath = path.join(__dirname, 'files', files[key].name)
            const filepath = './public/uploads/'+ files[key].name
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({status: "error", message: "fout"})
            })
        })  

        return res.json({ status: 'logged', message: Object.keys(files).toString()})
})

app.get('/listFiles', (req, res) => {
    const filepath = './public/uploads'
    fs.readdir(filepath, function (err, files) {
        if (err) res.status(500).json({error: err, fout: 'kan de map niet lezen'}) 

        res.json({message: 'gevonden', bestanden : files})
    });
    
})

const port = process.env.PORT || 3000
app.listen(port, () => { 
    console.log(`luisterd op poort ${port}`);
})