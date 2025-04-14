import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"

import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";

export default function App() {
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
  