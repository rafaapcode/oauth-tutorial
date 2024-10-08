import cors from "cors";
import express from "express";
import authRouter from "./routes/authRoute";

const app = express();

app.use(express.json());
app.use(cors())
app.use("/auth", authRouter);

app.listen(8001, () => console.log("Servidor rodando na porta 3000"));