const express = require('express')

const app = express()

app.use('/', express.static('public'))

app.get('/contact', (req, res) => {
    res.sendFile('public/pages/contact.html',{ root: __dirname })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`luisterd naar poort ${port}`);
})
