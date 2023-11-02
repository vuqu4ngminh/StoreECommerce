import express from "express";
import bodyParser from "body-parser";

require("dotenv").config()
const app = express();
const port = process.env.PORT || 6868;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next()
})

app.listen(port, () => {
    console.log(`Live at http://localhost:${port}`);
});