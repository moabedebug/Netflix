import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"

import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser";

export default function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()
  console.log("Auth user is here", user)

  useEffect(() => {
    authCheck()
  },[])
  
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
    </Routes>
    <Toaster/>
    <Footer/>
    </>
  )
}
