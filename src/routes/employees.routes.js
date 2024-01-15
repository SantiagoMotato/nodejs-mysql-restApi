import {Router} from 'express'
import {listarUsuario,listarUsuarios,registrarUsuario,actualizarUsuario,eliminarUsuario,validarUsuario} from '../controllers/employees.controller.js'

const router = Router()

router.get('/usuarios', listarUsuarios)
router.get('/usuarios/:id', listarUsuario)
router.post('/usuarios', registrarUsuario)
router.patch('/usuarios/:id', actualizarUsuario)
router.delete('/usuarios/:id', eliminarUsuario)
router.post('/usuarios/validation', validarUsuario)

export default router;