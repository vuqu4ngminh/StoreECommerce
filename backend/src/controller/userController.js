import connection from '../database/connection'

// get user by id
const getUserById = async (req,res) => {
    let id = req.params.id
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?',[id])
    return res.status(200).send(rows)
}
// get all users
const getAllUser = async (req,res) => {
    const [rows] = await connection.execute('SELECT * FROM users')
    return res.status(200).send(rows)
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
// login by email
const login = async (req, res) => {
    let {email,password} = req.body
    const [rows] = await connection.execute("SELECT * FROM users WHERE email = ? AND password = ?",[email,password])
    if(rows.length == 1){
        req.session.user = rows[0].role
    }
    return res.status(200).send(rows)
}
module.exports = {
    login,
    getUserById,
    getAllUser,
    addUser,
    updateUser,
    deleteUser
}