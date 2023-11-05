import connection from '../database/connection'

// get user by id
const getUserById = async (req,res) => {
    let id = req.params.id
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?',[id])
    return res.status(200).json({
        data: rows,
    });
}
// get all users
const getAllUser = async (req,res) => {
    const [rows] = await connection.execute('SELECT * FROM users')
    return res.status(200).json({
        data: rows,
    });
}
// add user (sign up)
const addUser = async (req,res) => {
    let {name,phone,email,address,password,role} = req.body
    await connection.execute('INSERT INTO users (name,phone,email,address,password,role) VALUES (?,?,?,?,?,?)',[name,phone,email,address,password,role])
    return res.status(200).json({
        message: 'ok',
    });
}
// update user
const updateUser = async (req,res) => {
    let {name,phone,email,address,password,role,id} = req.body
    await connection.execute('UPDATE users SET name = ?,phone = ?,email = ?,address = ?,password = ?,role = ? WHERE id = ?',[name,phone,email,address,password,role,id])
    return res.status(200).json({
        message: 'ok',
    });
}
// delete user
const deleteUser = async (req,res) => {
    let id = res.params.id
    await connection.execute('DELETE FROM users WHERE id = ?',[id])
    return res.status(200).json({
        message: 'ok',
    });
}
// login
const login = async (req, res) => {
    let {username,password} = req.body
    const [rows] = await connection.execute("SELECT * FROM users WHERE name = ? AND password = ?",[username,password])
    if(rows.length == 1){
        req.session.user = rows[0].role
    }
    return res.status(200).json({
        data: rows,
    });
}
module.exports = {
    login,
    getUserById,
    getAllUser,
    addUser,
    updateUser,
    deleteUser
}