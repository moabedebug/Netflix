import {create} from "zustand"

export const useAuthStore = create((set) => ({
    user: null,
    signup: async () => {},
    login: async () => {},
    logout: async () => {},
    authCheck: async () => {}
}))
