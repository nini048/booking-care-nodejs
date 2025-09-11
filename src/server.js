import express from 'express'
import bodyParser from 'body-parser'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './route/web'
import connectDB from './config/connectDB'
import cors from 'cors';
const path = require("path");
const fs = require("fs");
require('dotenv').config()
let app = express()
app.use(cors(
  {
    origin: true,
    credentials: true
  }
))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use("/uploads", express.static(uploadDir));


configViewEngine(app)
initWebRoutes(app)
connectDB()
let port = process.env.PORT || 6969;
app.listen(port, () => {
  console.log('backend node js i running on the port ' + port);
})
