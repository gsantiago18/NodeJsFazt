import {Router} from 'express';
import { 
    getUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser 
} from '../controllers/users.controllers.js';

const router = Router();


//Listar usuarios
router.get('/users',getUsers)

//Filtrar un usuario por id
router.get('/users/:id', getUserById)

//Actualizar usuario
router.put('/actusers/:id', updateUser)

//Crear usuario
router.post('/newuser', createUser)

//Eliminar usuario
router.delete('/users/:id', deleteUser)


export default (router)