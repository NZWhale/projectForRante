const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = 3000
const dataPath = "./data"
const usersFilePath = "./data/users.json"
const Busboy = require('busboy')
const cookieParser = require('cookie-parser')
const projectsModel = "./data/projectsModel.json"
const imagesPath = `${__dirname}/images`
const backgroundPath = `${__dirname}/background`

app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(__dirname))

//handlers for uploading images
app.post('/sendprojectmodel', (req, res) => {
    const projectModel = req.body
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath)
    }
    if (!fs.existsSync(projectsModel)) {
        fs.writeFileSync(projectsModel, "[]")
    }
    const arrayOfAllModels = JSON.parse(fs.readFileSync(projectsModel), "utf-8")
    arrayOfAllModels.push(projectModel)
    fs.writeFile("data/projectsModel.json", JSON.stringify(arrayOfAllModels), (err) => {
        if (err) throw err
        console.log("model added successful")
        res.status(200).send()
    })
})

app.post('/sendproject', function(req, res) {
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        const saveTo = path.join(imagesPath, filename);
        file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function() {
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
    });

    return req.pipe(busboy);
});

app.post('/background', function(req, res) {
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

        const saveTo = path.join(backgroundPath, filename);
        file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function() {
        res.writeHead(200, { 'Connection': 'close' });
        res.end("That's all folks!");
    });

    return req.pipe(busboy);
});

// function to create an array of links to images
function getBackgroundUrls(callback) {
    const arr = []
    fs.readdir("./background", { withFileTypes: true }, (err, files) => {
        if (err) {
            callback(err)
        } else {
            files.forEach(file => {
                if (path.extname(file.name) === ".jpg") {
                    const fileName = file.name
                    const imgpath = "/background/" + file.name
                    if (fileName) { arr.push(imgpath) }
                }
            })
            callback(null, arr)
        }
    })
}
//--------------------------------------


// get projects models
app.get("/getprojectsmodel", (req, res) => {
        const arrayOfAllModels = JSON.parse(fs.readFileSync(projectsModel), "utf-8")
        if (!arrayOfAllModels) throw error
        res.send(JSON.stringify(arrayOfAllModels))
    })
    // ------------------------------

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
            const user = findUserByLogin(userLogin)
            if (user) {
                res.status(200).send()
            } else {
                res.status(401).send()
            }
        }
    })
    // -------------------------------------------------

// Handler for deleting project
app.post('/deleteproject', (req, res) => {
    const arrayOfAllModels = JSON.parse(fs.readFileSync(projectsModel), "utf-8")
    const projectNumber = req.body.projectNumber
    const projectForDelete = arrayOfAllModels.find(model => model.projectNumber === projectNumber)
    fs.unlink(`${imagesPath}/${projectForDelete.fullImage}`, (err) => {
        if (err) throw err;
        console.log(`${imagesPath}/${projectForDelete.fullImage} was deleted`);
      });
    projectForDelete.partsOfImage.forEach(image => {
    fs.unlink(`${imagesPath}/${image}`, (err) => {
        if (err) throw err;
        console.log(`${imagesPath}/${image} was deleted`);
      });
    })
    fs.unlink(`${imagesPath}/${projectForDelete.projectDescription}`, (err) => {
        if (err) throw err;
        console.log(`${imagesPath}/${projectForDelete.projectDescription} was deleted`);
      });
    projectForDelete.projectsFromSameCollection.forEach(image => {
    fs.unlink(`${imagesPath}/${image}`, (err) => {
        if (err) throw err;
        console.log(`${imagesPath}/${image} was deleted`);
      });
    })
    let arrayWithoutDeletedModel = arrayOfAllModels.filter(model => model.projectNumber !== projectForDelete.projectNumber)
    if(arrayOfAllModels == projectForDelete) {
    fs.writeFile("data/projectsModel.json", "[]", (err) => {
        if (err) throw err
        console.log("model delete successful")
        res.status(200).send()
    })
}else{
    fs.writeFile("data/projectsModel.json", JSON.stringify(arrayWithoutDeletedModel), (err) => {
        if (err) throw err
        console.log("model delete successful")
        res.status(200).send()
    })
}
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})