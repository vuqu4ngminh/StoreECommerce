import express from "express"

let router = express.Router()
const initUserAPIRoute = (app) => {
    // write api here
    return app.use('/api/user/', router)
}

export default initUserAPIRoute