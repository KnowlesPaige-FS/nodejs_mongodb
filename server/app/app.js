const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const characterRouter = require("./api/routes/characterRouter");
const booksRouter = require("./api/routes/booksRouter");


// middleware for logging
app.use(morgan("dev"));

// parsing middleware
app.use(express.urlencoded({
    extended: true
}));

// middleware that all requests are json
app.use(express.json());


// middleware to handle CORS Policy
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE");
    }
    next();
});

// localhost:4001
app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Service is up"
    });
});

// router middleware
app.use("/characters", characterRouter);
app.use("/books", booksRouter);

// app middleware to handle errors and bad url paths
app.use((req, res, next) => {
    const error = new Error("NOT FOUND!!");
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
            method: req.method,
        },
    });
});

// connect to mongodb
// mongoose.connect(process.env.mongoDBURL);
mongoose.connect("mongodb://localhost:27017/GOT");

module.exports = app;