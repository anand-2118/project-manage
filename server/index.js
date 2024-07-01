const express = require('express');
const env = require('dotenv')
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");

const cors = require('cors')
env.config();
const mongoose = require('mongoose');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
})); 

const logStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a"
})
const errorStream = fs.createWriteStream(path.join(__dirname, "error.txt"), {
    flags: "a"
})

const userRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const { error } = require('console');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    // console.log("Middleware executing...");
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()} `;
    const log = `${req.method} ${req.originalUrl} ${time}`
    logStream.write(log + "\n")
    // console.log(req.originalUrl, time);
    next();
});

app.use("/api/auth", userRoutes)
app.use("/api/task", taskRoutes)

app.get('/', (req, res) => {
    res.send("Hello developers");
});

app.use((err, req, res, next) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()} `;
    const log = `${req.method} ${req.originalUrl} ${time} `
    errorStream.write(error + err.stack + "\n")
    res.status(500).send("internal server error");
});

app.use((req, res, next) => {
    const now = new Date();
    const time = ` ${now.toLocaleTimeString()} `;
    const log = `${req.method} ${req.originalUrl} ${time} `
    errorStream.write(error + "\n")
    res.status(404).send("route not found");

});

app.listen(4000, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log("connected to Db"))
        .catch((error) => console.log(error))
})

