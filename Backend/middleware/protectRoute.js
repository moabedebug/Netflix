import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";


export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies["jwt-netflix"]

        if(!token){
            return res.status(401).json({ message: "Não autorizado - Nenhum token fornecido" })
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET)
        if(!decoded) {
            return res.status(401).json({ message: "Não autorizado - Token inválido" })
        }

        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(401).json({ message: "Não autorizado - Usuário não encontrado" })
        }

        req.user = user

        next()
    }catch(error){
        console.log("Error no protectRoute Middleware");
        res.status(500).json({ message: "Erro interno no Servidor" })
    }
}