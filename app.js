

require("dotenv").config();

const express = require('express');
const morgan = require('morgan');

const flash = require('connect-flash');
const session = require('express-session');
const router = require('./routes');


const app =express();
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.set("views", __dirname + '/views');
app.set('view engine', 'ejs');

app.use(router);
app.use(flash());
app.use(morgan("dev"));
app.use(express.static(`${__dirname}/public`));

app.listen(process.env.PORT, () => {
    console.log(`listening on port : ${process.env.PORT}`);
})
