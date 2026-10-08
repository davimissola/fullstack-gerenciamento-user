import mssql from 'mssql'
import 'dotenv/config'


const CONNECTION_STRING = process.env.CONNECTION_STRING;


export async function dbConnection() {
    try {
        await mssql.connect(CONNECTION_STRING)
        return mssql;
    } catch(error) {
        console.log(error)
    }
}


export default dbConnection