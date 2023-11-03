import express from "express"

let router = express.Router()
const initOrderAPIRoute = (app) => {
    // write api here
    return app.use('/api/order/', router)
}

export default initOrderAPIRoute