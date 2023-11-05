import express from "express"
import userController from "../controller/userController"

let router = express.Router()
const initUserAPIRoute = (app) => {
    // write api here
    router.get('/login', userController.login)
    router.get('/:id', userController.getUserById)
    router.get('/', userController.getAllUser)
    router.post('/update', userController.updateUser)
    router.post('/add', userController.addUser)
    router.post('/delete/:id', userController.deleteUser)
    return app.use('/api/user/', router)
}

export default initUserAPIRoute