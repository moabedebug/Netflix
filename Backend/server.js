import express from "express";

import authRoutes from './routes/auth.routes.js/'

const app = express();

app.use("/api/v1/auth", authRoutes)

app.listen(5000, () => {
    console.log("Server iniciado: http://localhost:5000");
    console.log("OK")
})
