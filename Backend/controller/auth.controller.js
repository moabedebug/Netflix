import { User } from "../models/user.model.js"

export async function signup(req, res) {
    try{
        const { email, password, username } = req.body

        if(!email || !password || !username) {
            return res.status(400).json({ message:"todos os campos são obrigatórios" })
        }

        const emailRegex = /^[^\s@]+[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(email)){
            res.status(400).json({ message: "Email inválido" })
        }
        if(password.legth < 6){
            res.status(400).json({ message: "A senha deve conter mais de 6 caracteres" })
        }

        const existingUserByEmail = await User.findOne({ email:email })
        if(existingUserByEmail) {
            return res.status(400).json({ message: "Email já existe, tente outro" })
        }

        const existingUserByUser = await User.findOne({ username:username })
        if(existingUserByUser) {
            return res.status(400).json({ message: "Nome de usuário já existe, tente outro" })
        }

        const PORFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]
        const image = PORFILE_PICS[Math.floor(Math.random * PORFILE_PICS.length)]

        const newUser = new User({
            email,
            password,
            username,
            image
        })

        await newUser.save()

    }catch(error){
        console.log("Error no Singup Controller", error.message)
        res.status(500).json({ message: "Erro interno do servidor" })
    }
}

export async function login(req, res) {
    res.send("Login route")
}

export async function logout(req, res) {
    res.send("Logout route")
}
