const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const userApis = require('./controllers/user');
const taskApis = require('./controllers/task');

app.use(express.json());
app.use(cors({ 
        origin: ["http://localhost:5173"],
        credentials: true,
     }));
app.use(cookieParser());

require('dotenv').config();
require("./connection/conn");

app.get("/", (req, res) => {
    res.send("Type :- localhost:3000/register");
});

app.use("/api/v1", userApis);
app.use("/api/v1", taskApis);

app.listen(`${process.env.PORT}`, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});


