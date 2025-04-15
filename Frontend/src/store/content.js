import { create } from "zustand";

export const useContenteStore = create((set) => ({
    contentType:'movie',
    setContentType: (type) => set({contentType:type})
}))
