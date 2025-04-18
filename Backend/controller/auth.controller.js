import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

function formatUser(user) {
    const { password, __v, ...userData } = user._doc;
    return userData;
}

export async function signup(req, res) {
    try{
        const { email, password, username } = req.body

        if(!email || !password || !username) {
            return res.status(400).json({ message:"Todos os campos são obrigatórios" })
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({ message: "Email inválido" })
        }

        if(password.length < 6){
            return res.status(400).json({ message: "A senha deve conter 6 ou mais caracteres" })
        }

        const existingUserByEmail = await User.findOne({ email:email })
        if(existingUserByEmail) {
            return res.status(400).json({ message: "Email já existe, tente outro" })
        }

        const existingUserByUser = await User.findOne({ username:username })
        if(existingUserByUser) {
            return res.status(400).json({ message: "Nome de usuário já existe, tente outro" })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        })

        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save()
        
        res.status(201).json({ 
            message: "Usuário criado com sucesso",
            user: formatUser(newUser)
        })
        
    }catch(error){
        console.log("Error no Singup Controller", error.message)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}

export async function login(req, res) {
    try{
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(400).json({ message:"tod  ios" })
        }

        const user = await User.findOne({ email:email })
        if(!user) {
            return res.status(400).json({ message:"Email ou senha inválidos" })
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Email ou senha inválidos" })
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            message: "Usuário Logado",
            user: formatUser(user)
        })
    }catch (error) {
        console.log("Error no Login controller", error.message)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}

export async function logout(req, res) {
    try{
        res.clearCookie("jwt-netflix")
        res.status(200).json({ message: "Deslogado com sucesso" })
    }catch(error) {
        console.log("Error no logout controller", error.message)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}

export async function authCheck(req, res) {
    try{
        console.log("req.user:", req.user)
        res.status(200).json({ success: true, user: formatUser(req.user) })
    }catch(error){
        console.log("Error no authCheck controller", error.message)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}
