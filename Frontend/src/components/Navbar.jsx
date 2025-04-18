import { useState } from "react"

import { Link } from "react-router-dom"
import { LogOut, Menu, Search } from "lucide-react"

import { useAuthStore } from "../store/authUser"
import { useContentStore } from "../store/content"

export const Navbar = () =>  {
    const { user, logout } = useAuthStore()

    const [isMobileMenuOpen, setIsMobileOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileOpen(!isMobileMenuOpen)
    }

    const { contentType, setContentType } = useContentStore()

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
        <div className="flex items-center gap-10 z-50"> 
            <Link to="/">
                <img src="/netflix-logo.png" alt="Netflix Logo" className="w-32 sm:w-40"/>
            </Link>

            <div className="hidden sm:flex gap-2 items-center">
                <Link to="/" className="hover:underline" onClick={() => setContentType("movie")}>
                    Filmes
                </Link>
                |
                <Link to="/" className="hover:underline" onClick={() => setContentType("tv")}>
                    Séries
                </Link>
                |
                {/* <Link to="/history" className="hover:underline" >
                    Histórico de pesquisa
                </Link> */}
            </div>
        </div>

        <div className="flex gap-5 items-center z-50">
            <Link to={"/search"}>
                <Search className="size-6 cursor-pointer" />
            </Link>
            <img src={user.image} alt="Avatar" className="h-8 rounded cursor-pointer" />
            <LogOut className="size-6 cursor-pointer" onClick={logout}/>

            <div className="sm:hidden">
                <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
            </div>
        </div>

        {isMobileMenuOpen && (
            <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
                <Link 
                    to={"/"} 
                    className="block hover:underline p-2"
                    onClick={() => {
                        setContentType("movie");
                        setTimeout(() => toggleMobileMenu(), 0);
                    }} 
                >
                    Filmes
                </Link>
                <Link 
                    to={"/"} 
                    className="block hover:underline p-2" 
                    onClick={() => {
                        setContentType("tv");
                        setTimeout(() => toggleMobileMenu(), 0);
                    }}
                >
                    Séries
                </Link>
                <Link to={"/history"} className="block hover:underline p-2" onClick={toggleMobileMenu} >
                    Histórico de pesquisa
                </Link>
            </div>
        )}
    </header>
  )
}