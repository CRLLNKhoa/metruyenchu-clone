const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require("./routers");
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieParser = require("cookie-parser")

dotenv.config();

const app = express();
const port = process.env.PORT || 8001;

app.get("/", (req, res) => {
  res.send("@Crlk xin chào!");
});

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(cookieParser())

routes(app);

mongoose
  .connect(process.env.KEY_MDB)
  .then(() => {
    console.log("Connect Mongoose Success!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("Server is running in port: ", + port);
});
