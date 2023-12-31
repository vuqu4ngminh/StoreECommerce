import express from "express"
import orderController from "../controller/orderController"

let router = express.Router()
const initOrderAPIRoute = (app) => {
    // write api here
    router.get('/', orderController.getAllOrder)
    router.get('/:id', orderController.getOrderById)
    router.get('/detail/:id', orderController.getOrderByUserId)
    router.post('/add', orderController.addOrder)
    router.post('/:id', orderController.updateOrder)
    
    return app.use('/api/order/', router)
}

export default initOrderAPIRoute