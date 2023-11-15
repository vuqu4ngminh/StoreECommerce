import express from "express";
import bodyParser from "body-parser";
import session from 'express-session';
import initMobileAPIRoute from "./api/mobileApi"
import initOrderAPIRoute from "./api/orderApi"
import initUserAPIRoute from "./api/userApi"

require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 6868;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next()
})

initMobileAPIRoute(app)
initOrderAPIRoute(app)
initUserAPIRoute(app)
app.listen(PORT, () => {
    console.log(`Live at http://localhost:${PORT}`);
});