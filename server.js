const http = require("http");
const app = require("./app/app");
const connectDB = require("./app/db/config");
require("dotenv").config();

connectDB();

http.createServer(app).listen(process.env.port || 4001, () =>
    console.log(`Server up on PORT: ${process.env.port}`)
);