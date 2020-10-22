const express = require('express')
const multer = require('multer')
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000
const dataPath = "./data"
const usersFilePath = "./data/users.json"

app.use(bodyParser.json())

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
    // ----------------------------------------

// This are handlers for login and registation form

const generateAuthToken = () => {
    const tokenLength = 16
    let result = ""
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    for (let i = 0; i < tokenLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

let authorisedUsers = {}

const findUserByLogin = (userLogin) => {
    const users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"))
    return users.find(({ login }) => login === userLogin)
}

app.post('/login', (req, res) => {
    const user = req.body
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath)
    }
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, "[]")
    }
    const userFound = findUserByLogin(user.login)
    if (userFound && userFound.password === user.password) {
        console.log("login successful")
        const cookieAge = 24 * 60 * 60 * 1000
        const authToken = generateAuthToken()
        authorisedUsers[authToken] = userFound.login
        res.cookie('auth-token', authToken, { maxAge: cookieAge, httpOnly: false })
        res.status(200).send("login successful")
    } else {
        console.log("user not found")
        res.status(401).send("user not found")
    }
})

app.post('/check-login', (req, res) => {
        if (req.cookies) {
            const authToken = req.cookies["auth-token"]
            const userLogin = authorisedUsers[authToken]
            if (userLogin) {
                const user = findUserByLogin(userLogin)
                res.status(200).send("already logged in")
            }
            res.status(401)
        }
    })
    // -------------------------------------------------


app.listen(port)