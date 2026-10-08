import express from 'express'
import userController from '../controller/userController.js'


const router = express.Router()


router.get('/', userController.listarUsers)
router.post('/', userController.addUser)
router.delete('/', userController.removeUser)


export default router