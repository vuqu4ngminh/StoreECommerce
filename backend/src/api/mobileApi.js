import express from "express"
import mobileController from "../controller/mobileController"

let router = express.Router()
const initMobileAPIRoute = (app) => {
    // write api here
    router.get('/', mobileController.getAllMobile)
    router.get('/:id', mobileController.getMobileById)
    router.post('/add', mobileController.addMobile)
    router.post('/update', mobileController.updateMobile)
    router.post('/delete/:id', mobileController.deleteMobile)
    return app.use('/api/mobile/', router)
}

export default initMobileAPIRoute