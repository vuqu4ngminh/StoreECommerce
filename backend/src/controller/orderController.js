import connection from "../database/connection"

const createId = () => {
    let value = 0;
    do {
        value = Math.floor(Math.random() * 2147483648)
    } while (value > 2147483647);
    return value;
}

const getCurrentDate = () => {
    let currentDate = new Date();
    return currentDate.toISOString().slice(0, 19).replace('T', ' ');
}

// get order by userId
const getOrderByUserId = async (req, res) => {
    let id = req.params.id
    const [rows] = await connection.execute(`
        SELECT users.name, users.phone, users.address, orders.*
        FROM orders
        INNER JOIN users ON orders.userId = users.id
        WHERE orders.id = ?;
    `, [id])
    return res.status(200).send(rows)
}
// get order by id
const getOrderById = async (req, res) => {
    let id = req.params.id
    const [rows] = await connection.execute(`
        SELECT orders.*, orders_mobiles.*, mobiles.name
        FROM orders_mobiles
        INNER JOIN orders ON orders_mobiles.orderId = orders.id
        INNER JOIN mobiles ON orders_mobiles.mobileId = mobiles.id
        WHERE orders_mobiles.orderId = ?;
    `, [id])
    return res.status(200).send(rows)
}
// get all order
const getAllOrder = async (req, res) => {
    const [rows] = await connection.execute(`
        SELECT orders.*, users.name
        FROM orders 
        INNER JOIN users ON orders.userId = users.id
        ORDER BY orderDate DESC
    `)
    return res.status(200).send(rows)
}
// update order
const updateOrder = async (req, res) => {
    let id = req.params.id
    let s = req.body.status
    await connection.execute('UPDATE orders SET status = ? WHERE id = ?', [s, id])
    return res.status(200).json({
        message: "ok",
    });
}
// add order
const addOrder = async (req, res) => {
    let cartItems = req.body.cartItems
    let total = Number(req.body.total)
    let userId = Number(req.body.userId)
    let id = createId();
    let orderDate = getCurrentDate();
    let status = 'open';
    await connection.execute("INSERT INTO orders (id, userId, orderDate, total, status) VALUES (?, ?, ? , ?, ?)", [id, userId, orderDate, total, status])
    cartItems.forEach(async (item) => {
        let mobileId = item.id
        let price = item.price * item.quantity
        let amount = item.quantity
        await connection.execute("INSERT INTO orders_mobiles (orderId, mobileId, total, amount) VALUES (?, ?, ?, ?)", [id, mobileId, price, amount])
    })
    return res.status(200).json({
        message: "ok",
    });
}
module.exports = {
    getOrderById,
    getAllOrder,
    updateOrder,
    addOrder,
    getOrderByUserId
}