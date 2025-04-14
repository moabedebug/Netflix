import axios from "axios"
import toast from "react-hot-toast"
import {create} from "zustand"

export const useAuthStore = create((set) => ({
    user: null,
    isSigninUp: false,
    isCheckingAuth: true,
    signup: async (credentials) => {
        set({isSigninUp:true})
        try{
            const response = await axios.post("/api/v1/auth/signup", credentials)
            set({user:response.data.user, isSigninUp:false})
            toast.success("Conta criada com sucesso")
        }catch(error){
            toast.error(error.response.data.message || "Ocorreu um erro")
            set({isSigninUp:false, user:null})
        }
    },
    login: async () => {},
    logout: async () => {},
    authCheck: async () => {
        set({isCheckingAuth: true})
        try{
            const response = await axios.get("/api/v1/auth/authCheck")
            set({user:response.data.user, isCheckingAuth: false})
        }catch(error){
            set({isCheckingAuth: false, user:null})
            // toast.error(error.response.data.message || "Ocorreu um erro")
        }
    }
}))
