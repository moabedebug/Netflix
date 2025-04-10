import express from "express";

import authRoutes from './routes/auth.routes.js'
import movieRoutes from './routes/movie.routes.js'
import tvRoutes from './routes/tv.routes.js'

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js"

const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/movie", movieRoutes)
app.use("/api/v1/tv", tvRoutes)

app.listen(PORT, () => {
    console.log(`Server iniciado: http://localhost:${PORT}`);
    console.log("Server OK")
    connectDB();
})
