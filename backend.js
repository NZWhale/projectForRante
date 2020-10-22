const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const app = express()
const port = 3000

// uploading background images to the server
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

app.use(express.static(__dirname))

app.use(multer({ storage: storageConfig }).single("filedata"))
app.post("/upload", function(req, res, next) {

        let filedata = req.file
        if (!filedata)
            res.send("Uploading error")
        else
            res.send("file uploaded")
    })
    // ---------------------------------------------

// function to create an array of links to images
function getImagesUrls(callback) {
    const arr = []
    fs.readdir("./upload", { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err)
        } else {
            files.forEach(file => {
                if (path.extname(file.name) === ".jpg") {
                    const imgpath = "/upload/" + file.name
                    arr.push(imgpath)
                }
            })
            callback(null, arr)
        }
    })
}

// get background images from the server
app.get("/uploads", (req, res) => {
    getImagesUrls((err, arr) => {
        if (err) {
            res.send("error")
        } else {
            res.send(JSON.stringify(arr))
        }
    })
})

app.listen(port)