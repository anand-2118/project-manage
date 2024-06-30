const express = require('express');
const env = require('dotenv')
const bodyParser = require('body-parser');
const cors = require('cors')
env.config();
const { default: mongoose } = require('mongoose');

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const userRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");

app.get('/', (req, res) => {
    res.send("Hello developers");
});

app.use("/api/auth",userRoutes)
app.use("/api/task",taskRoutes)



app.listen(process.env.PORT,()=>{
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log("connected to Db"))
    .catch((error)=>console.log(error))
})