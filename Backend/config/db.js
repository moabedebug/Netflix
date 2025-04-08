import mongoose from 'mongoose'
import { ENV_VARS } from './envVars'

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MongoDB conectado:" + conn.connection.host)
    } catch (error){
        console.log("Erro de conexão do MongoDB:" + error.massage)
        process.exit(1)
    }
}
