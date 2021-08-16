const express = require("express")
const multer = require("multer")
const upload = multer({ dest: "uploads/"})

const app = express()

app.post("/images", upload.single("avatar"), (req, res) => {
    res.send("lasd")
})
