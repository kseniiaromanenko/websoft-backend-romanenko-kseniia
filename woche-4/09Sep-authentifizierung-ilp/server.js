import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app =express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

const users =[];
const tokens = new Map();

app.get("/", (req, res) => {
    res.json({
        message: "Authentication API funktioniert ",
    });
});

app.get("/health", (req, res) =>{
    res.json({
        status: "ok",
    });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});