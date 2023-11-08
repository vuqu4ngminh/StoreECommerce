import connection from '../database/connection'

// get all mobile
const getAllMobile = async (req, res) => {
    const [rows] = await connection.execute("SELECT * FROM mobiles");
    return res.status(200).send(rows);
}
// get mobile by id
const getMobileById = async (req, res) => {
    let id = req.params.id
    const [rows] = await connection.execute("SELECT * FROM mobiles WHERE id = ?",[id]);
    return res.status(200).json({
        data: rows,
    });
}
// update mobile
const updateMobile = async (req, res) => {
    let { id, name, description, price, imageUrl, status } = req.body;
    await connection.execute(`
        UPDATE mobiles SET name = ?, description = ?, price = ?, imageUrl = ?, status = ? WHERE id = ?
    `, [name, description, price, imageUrl, status, id])
    return res.status(200).json({
        message: "ok",
    });
}
// add mobile
const addMobile = async (req, res) => {
    let {name, description, price, imageUrl, status } = req.body;
    await connection.execute(`
    INSERT INTO mobiles (name, description, price, imageUrl, status) VALUES (?,?,?,?,?)
    `, [name, description, price, imageUrl, status])
    return res.status(200).json({
        message: "ok",
    });
}
const deleteMobile = async (req,res) => {
    let id = req.params.id
    await connection.execute("DELETE FROM mobiles WHERE id = ?",[id])
    return res.status(200).json({
        message: "ok",
    });
}
module.exports = {
    getAllMobile,
    getMobileById,
    addMobile,
    updateMobile,
    deleteMobile
}