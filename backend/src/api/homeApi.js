import express from "express"

let router = express.Router()
const initHomeAPIRoute = (app) => {
    // write api here
    return app.use('/api/home/', router)
}

export default initHomeAPIRoute