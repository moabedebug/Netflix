import axios from "axios"
import toast from "react-hot-toast"
import {create} from "zustand"

export const useAuthStore = create((set) => ({
    user: null,
    isSigninUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    signup: async (credentials) => {
        set({isSigninUp:true})
        try{
            const response = await axios.post("/api/v1/auth/signup", credentials, { withCredentials: true})
            set({user:response.data.user, isSigninUp:false})
            toast.success("Conta criada com sucesso")
        }catch(error){
            toast.error(error.response.data.message || "Autenticação de Cadastro Falhou")
            set({isSigninUp:false, user:null})
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn: true })
        try {
            const response = await axios.post("/api/v1/auth/login", credentials, { withCredentials: true})
            set({user: response.data.user, isLoggingIn: false})
        } catch (error) {
            set({ isLoggingIn: false, user: null })
            toast.error(error.response.data.message || "Autenticação de login Falhou")
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Deslogado com sucesso");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Erro ao Deslogar");
		}
    },
    authCheck: async () => {
        set({isCheckingAuth: true})
        try{
            const response = await axios.get("/api/v1/auth/authCheck", { withCredentials: true })
            set({user: response.data.user, isCheckingAuth: false})
        }catch(error){
            set({isCheckingAuth: false, user:null})
            // toast.error(error.response.data.message || "Ocorreu um erro")
        }
    }
}))
