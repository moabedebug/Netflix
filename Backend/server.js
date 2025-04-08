import express from "express";
import authRoutes from './routes/auth.routes.js'
import { ENV_VARS } from "./config/envVars.js";

const app = express();
const PORT = ENV_VARS.PORT

app.use("/api/v1/auth", authRoutes)

app.listen(PORT, () => {
    console.log(`Server iniciado: http://localhost:${PORT}`);
    console.log("OK")
})
