import express from "express";
import type { Response as ExpressRes, Request as ExpressReq } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/ormConfig";
import allRoutes from "./routes/index";
import cors from "cors";
dotenv.config();
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/", (req: ExpressReq, res: ExpressRes) => {
  res.send("application edTech runing");
});

app.use("/api", allRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Connexion à la base de données réussie !");
    app.listen(port, () => {
      console.log(`server runinig on port ${port}`);
    });
  })
  .catch((error) => console.log("Erreur de connexion :", error));
