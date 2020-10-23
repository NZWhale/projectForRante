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
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.originalUrl + "_" + file.originalname)
    }
})

app.use(express.static(__dirname))

app.use(multer({ storage: storageConfig }).array("images"))
app.post("/images", function(req, res, next) {

        let images = req.files
        if (!images)
            res.send("Uploading error")
        else
            res.status(200).send()
        console.log("file uploaded")
    })
    // ---------------------------------------------

// function to create an array of links to images
function getBackgroundUrls(callback) {
    const arr = []
    fs.readdir("./images", { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err)
        } else {
            files.forEach(file => {
                if (path.extname(file.name) === ".jpg") {
                    const val = "background_"
                    const fileName = file.name
                    const imgpath = "/images/" + file.name
                    if (fileName.startsWith(val)) { arr.push(imgpath) }
                }
            })
            callback(null, arr)
        }
    })
}

function getPartsUrls(callback) {
    const arr = []
    fs.readdir("./images", { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err)
        } else {
            files.forEach(file => {
                if (path.extname(file.name) === ".jpg") {
                    const val = "parts_"
                    const fileName = file.name
                    const imgpath = "/images/" + file.name
                    if (fileName.startsWith(val)) { arr.push(imgpath) }
                }
            })
            callback(null, arr)
        }
    })
}

function getFullUrls(callback) {
    const arr = []
    fs.readdir("./images", { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err)
        } else {
            files.forEach(file => {
                if (path.extname(file.name) === ".jpg") {
                    const val = "full_"
                    const fileName = file.name
                    const imgpath = "/images/" + file.name
                    if (fileName.startsWith(val)) { arr.push(imgpath) }
                }
            })
            callback(null, arr)
        }
    })
}
//--------------------------------------


// get background images from the server
app.get("/getbackground", (req, res) => {
        getBackgroundUrls((err, arr) => {
            if (err) {
                res.send("error")
            } else {
                res.send(JSON.stringify(arr))
            }
        })
    })
    // ----------------------------------------

// get parts images from the server
app.get("/getpart", (req, res) => {
        getPartsUrls((err, arr) => {
            if (err) {
                res.send("error")
            } else {
                res.send(JSON.stringify(arr))
            }
        })
    })
    // ----------------------------------------


// get full images from the server
app.get("/getfull", (req, res) => {
        getFullUrls((err, arr) => {
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
        const cookieAge = 24 * 60 * 60 * 1000
        const authToken = generateAuthToken()
        authorisedUsers[authToken] = userFound.login
        res.cookie('auth-token', authToken, { maxAge: cookieAge, httpOnly: false })
        console.log("login successful")
        res.status(200).send("login successful")
    } else {
        console.log("user not found")
        res.status(404).send("user not found")
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
            res.status(401).send("user not found")
        }
    })
    // -------------------------------------------------


app.listen(port)