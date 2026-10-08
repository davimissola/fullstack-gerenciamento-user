import express from 'express'
import userRouter from './routes/userRoutes.js'
import cors from 'cors'


const app = express()
app.use(express.json())
app.use(cors())



app.use('/users', userRouter)

app.listen(3000, () => console.log(`API funcionando!\nServidor rodando em: http://localhost:3000`))