require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const flash = require("connect-flash");
const session = require("express-session");
const router = require("./routes");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(router);
app.use(flash());
app.use(morgan("dev"));

app.listen(process.env.PORT, () => {
  console.log(`listening on port : ${process.env.PORT}`);
});
