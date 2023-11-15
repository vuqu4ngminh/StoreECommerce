import connection from "../database/connection"

// get order by id
const getOrderById = async (req, res) => {
    let id = req.params.id
    const [rows] = await connection.execute(`
        SELECT orders.*, orders_mobiles.*, mobiles.name
        FROM orders_mobiles
        INNER JOIN orders ON orders_mobiles.orderId = orders.id
        INNER JOIN mobiles ON orders_mobiles.mobileId = mobiles.id
        WHERE orders_mobiles.orderId = ?;
    `,[id])
    return res.status(200).send(rows)
}
// get all order
const getAllOrder = async (req, res) => {
    try {
        let userId = req.body.userId
        const [rows] = await connection.execute('SELECT * FROM orders WHERE userId = ? ORDER BY orderDate DESC', [userId])
        return res.status(200).send(rows)
    } catch (error) {
        const [rows] = await connection.execute('SELECT * FROM orders ORDER BY orderDate DESC')
        return res.status(200).send(rows)
    }
}
// update order
const updateOrder = async (req, res) => {
    let id = req.params.id
    let status = req.body.status
    await connection.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id])
    return res.status(200).json({
        message: "ok",
    });
}
module.exports = {
    getOrderById,
    getAllOrder,
    updateOrder,
}