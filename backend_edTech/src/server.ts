import express from "express";
import type { Response as ExpressRes, Request as ExpressReq}  from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/ormConfig";

dotenv.config();
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req: ExpressReq, res: ExpressRes)=>{
    res.send("application edTech runing");
})

AppDataSource.initialize()
    .then(() => {
        console.log("Connexion à la base de données réussie !");
        app.listen(port, ()=>{
            console.log(`server runinig on port ${port}`);
        })
    })
    .catch((error) => console.log("Erreur de connexion :",error));
