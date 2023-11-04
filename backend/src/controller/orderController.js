import connection from "../database/connection"

// get order by id
const getOrderByOrderId = async (req,res) => {
    let id = req.params.id
    const [rows] = await connection.execute('SELECT * FROM orders WHERE id = ?',[id])
    return res.status(200).json({
        data: rows,
    });
}
// get orders by userId
const getOrderByUserId = async (req,res) => {
    let userId = req.params.id
    const [rows] = await connection.execute('SELECT * FROM orders WHERE userId = ? ORDER BY orderDate DESC',[userId])
    return res.status(200).json({
        data: rows,
    });
}
// get all order
const getAllOrder = async (req,res) => {
    const [rows] = await connection.execute('SELECT * FROM orders ORDER BY orderDate DESC')
    return res.status(200).json({
        data: rows,
    });
}
// update order
const updateOrder = async (req,res) => {
    let id = req.params.id
    let status = req.body.status
    await connection.execute('UPDATE orders SET status = ? WHERE id = ?',[status,id])
    return res.status(200).json({
        message: "ok",
    });
}
module.exports = {
    getOrderByOrderId,
    getOrderByUserId,
    getAllOrder,
    updateOrder
}