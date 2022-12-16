const express = require('express')

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

const port = process.env.PORT || 3000
app.listen(port, () => { 
    console.log(`luisterd op poort ${port}`);
})