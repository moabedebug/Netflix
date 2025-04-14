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
            const response = await axios.post("/api/v1/auth/signup", credentials, { withCredentials: true})
            set({user:response.data.user, isSigninUp:false})
            toast.success("Conta criada com sucesso")
        }catch(error){
            toast.error(error.response.data.message || "Ocorreu um erro")
            set({isSigninUp:false, user:null})
        }
    },
    login: async () => {},
    logout: async () => {
        set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Deslogado com sucesso");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Ocorreu um erro");
		}
    },
    authCheck: async () => {
        set({isCheckingAuth: true})
        try{
            const response = await axios.get("/api/v1/auth/authCheck", { withCredentials: true })
            set({user:response.data.user, isCheckingAuth: false})
        }catch(error){
            set({isCheckingAuth: false, user:null})
            // toast.error(error.response.data.message || "Ocorreu um erro")
        }
    }
}))
