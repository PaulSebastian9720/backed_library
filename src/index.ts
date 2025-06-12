import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./config/datasource";
import libroRoutes from "./routes/libros.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error("Error no manejado:", err);
  res.status(500).json({ msg: "Error interno del servidor" });
});

app.use("/libros", libroRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Base de datos conectada");
    app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
  })
  .catch((err) => console.error("Error al conectar DB", err));
