var express = require('express');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var app = express();
var port = 3000;
var dataPath = "./data";
var usersFilePath = "./data/users.json";
// uploading background images to the server
var storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
app.use(express.static(__dirname));
app.use(multer({ storage: storageConfig }).single("filedata"));
app.post("/upload", function (req, res, next) {
    var filedata = req.file;
    if (!filedata)
        res.send("Uploading error");
    else
        res.send("file uploaded");
});
// ---------------------------------------------
// function to create an array of links to images
function getImagesUrls(callback) {
    var arr = [];
    fs.readdir("./upload", { withFileTypes: true }, function (err, files) {
        if (err) {
            callback(err);
        }
        else {
            files.forEach(function (file) {
                if (path.extname(file.name) === ".jpg") {
                    var imgpath = "/upload/" + file.name;
                    arr.push(imgpath);
                }
            });
            callback(null, arr);
        }
    });
}
// get background images from the server
app.get("/uploads", function (req, res) {
    getImagesUrls(function (err, arr) {
        if (err) {
            res.send("error");
        }
        else {
            res.send(JSON.stringify(arr));
        }
    });
});
// ----------------------------------------
// This are handlers for login and registation form
var generateAuthToken = function () {
    var tokenLength = 16;
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < tokenLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
var authorisedUsers = {};
var findUserByLogin = function (userLogin) {
    var users = JSON.parse(fs.readFileSync("data/users.json", "utf-8"));
    return users.find(function (_a) {
        var login = _a.login;
        return login === userLogin;
    });
};
app.post('/login', function (req, res) {
    var user = req.body;
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath);
    }
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, "[]");
    }
    var userFound = findUserByLogin(user.login);
    if (userFound && userFound.password === user.password) {
        console.log("login successful");
        var cookieAge = 24 * 60 * 60 * 1000;
        var authToken = generateAuthToken();
        authorisedUsers[authToken] = userFound.login;
        res.cookie('auth-token', authToken, { maxAge: cookieAge, httpOnly: false });
        res.status(200).send("login successful");
    }
    else {
        console.log("user not found");
        res.status(401).send("user not found");
    }
});
app.post('/check-login', function (req, res) {
    if (req.cookies) {
        var authToken = req.cookies["auth-token"];
        var userLogin = authorisedUsers[authToken];
        if (userLogin) {
            var user = findUserByLogin(userLogin);
            res.status(200).send("already logged in");
        }
        res.status(401);
    }
});
// -------------------------------------------------
app.listen(port);
