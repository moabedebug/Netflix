import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("Server OK!")
})

app.listen(5000, () => {
    console.log("Server iniciado: http://localhost:5000");
    console.log("OK")
})