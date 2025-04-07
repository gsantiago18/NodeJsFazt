import { pool } from '../db.js'

//Funciones para manejar las peticiones

//Listar usuarios
export const getUsers = async (req,res)=>{
    const {rows} = await pool.query('SELECT * FROM users')
    res.json(rows)
}

//Filtrar un usuario por id
export const getUserById = async (req,res)=>{
    const {id} =  req.params
    const {rows} = await pool.query('SELECT * from users where id = $1', [id])    
 
     if (rows.length === 0){
         return res.status(404).json({ message: "usuario no encontrado" })
     }
 
     res.json(rows[0])
 }

 //Actualizar usuario
 export const updateUser = async (req,res)=>{
     const {id} = req.params
     const {name, email} = req.body
     if (!name || !email){
         return res.status(400).json({message: 'Todos los campos son obligatorios'});
     }
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
         return res.status(400).json({ message: 'Formato de correo inválido' });
     }
     if (!id){
         return res.status(400).json({message: 'El id es obligatorio'})
     }
 
     try{
         const result = await pool.query('UPDATE USERS SET name = $1, email = $2 WHERE id = $3', [name, email, id])
 
         if (result.rowCount === 0) {
             return res.status(404).json({ message: 'Usuario no encontrado' });
         }
 
         res.status(200).json({message: 'Usuario actualizado con exito'})
     } catch(error){
         if (error.code === '23505') {
             return res.status(409).json({ message: 'El correo ya está registrado' });
         }
         console.log(error)
         res.status(500).json({message: 'Error en el servidor'})
     }
 }

 //Crear usuario
 export const createUser = async  (req,res)=>{

    const {name, email} = req.body
    if (!name || !email){
        return res.status(400).json({message: 'Todos los campos son obligatorios'});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de correo inválido' });
    }

    try{
        const result = await  pool.query('INSERT INTO users(name, email) VALUES ($1,$2)', [name, email]);
        res.status(201).json({message:'Usuario creado con exito'});       
    } catch(error){
        if (error.code === '23505') {
            return res.status(409).json({ message: 'El correo ya está registrado' });
        }
        console.log(error)
        res.status(500).json({message: 'Error en el servidor'})
    }
}

//Eliminar usuario
export const deleteUser = async (req,res)=>{
    const {id} = req.params

    if(!id){
        return res.status(400).json({message: 'El id es obligatorio'})
    }
    
    const {rowCount} =  await pool.query('DELETE FROM users WHERE id = $1', [id])
    if (rowCount === 0){
        return res.status(404).json({ message: "User  not Found" })
    }

    res.status(200).json({message: 'Usuario eliminado con exito'})

}