import user from '../models/user.js'

class userController {
    
    static async listarUsers(req, res) {
        try {
            const users = await user.listarUser()
            res.status(200).json(users)
        } catch(error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async addUser(req, res) {
        console.log('chegou')
        try {
            const { nome, email, idade } = req.body
            const result = await user.addUser(nome, email, idade)

            if (result < 1) {
                return res.status(400).json({message: "Nenhum usuário inserido."})
            }
            
            return res.status(201).json({message: "Usuário criado com sucesso."})
        } catch(error) {
            return res.status(500).json({ error: error.message })
        }
    }

    static async removeUser(req, res) {
        try {
            const { id } = req.body
            const result = await user.removeUser(id)
            
            if (result < 1) {
                return res.status(400).json({message: "Nenhum usuário removido."})
            }
            
            return res.status(201).json({message: "Usuário removido com sucesso."})
        } catch (error) {
            throw new Error(error)
        }
    }
}


export default userController