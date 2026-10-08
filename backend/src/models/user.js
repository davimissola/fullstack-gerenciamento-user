import dbConnection from "../configs/dbConnect.js";

class user {

    static async listarUser() {
        try {
            const conexao = await dbConnection()
            const result = await conexao.query('SELECT * FROM nodejs.users')
            return result.recordset
        } catch(error) {
            throw new Error(error)
        }
    }

    static async addUser(nome, email, idade) {
        try {
            const conexao = await dbConnection()
            const result = await conexao.query(`EXEC nodejs.sp_AdicionarUsuario "${nome}", "${email}", ${idade}`)
            return result.rowsAffected[0]
        } catch(error) {
            throw new Error(error)
        }
    }

    static async removeUser(id) {
        try {
            const conexao = await dbConnection()
            const result = await conexao.query(`
                DELETE FROM nodejs.users
                WHERE id = ${id}
                `)
            return result.rowsAffected[0]
        } catch(error) {
            throw new Error(error)
        }
    }
}


export default user