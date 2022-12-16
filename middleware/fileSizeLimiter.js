const MB = 5

const FILE_SIZE_LIMIT = MB * 1024 * 1024

const fileSizeLimiter = (req, res, next) => {
    const files = req.files
    const filesOverLimit = []

    Object.keys(files).forEach(key => {
        if (files[key].size > FILE_SIZE_LIMIT){
            filesOverLimit.push(files[key].name)
        }
    })

    if (filesOverLimit.length){
        res.json({error: 'te groot', message : 'bestanden te groot'})
    }

    next()
}

module.exports = fileSizeLimiter