import multer from "multer";
import { Router } from "express";
import {
  actualizarLibro,
  crearLibro,
  eliminarLibro,
  obtenerLibro,
  obtenerLibros,
  obtenerLibrosPorNombre,
} from "../controller/libroController";

const router = Router();

router.get('/api/libros/load', (req, res) => {
  const start = Date.now();
  while (Date.now() - start < 2000) {
    Math.sqrt(Math.random() * Math.random());
  }
  res.send('Carga alta simulada por 2 segundos');
});

router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

router.post("/", crearLibro);
router.get("/", obtenerLibros);
router.get("/:id", obtenerLibro);
router.get("/nombre/:nombre", obtenerLibrosPorNombre);

router.put("/:id", actualizarLibro);
router.delete("/:id", eliminarLibro);

export default router;
