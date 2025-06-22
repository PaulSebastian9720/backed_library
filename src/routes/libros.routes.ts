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

router.post("/", crearLibro);
router.get("/", obtenerLibros);
router.get("/:id", obtenerLibro);
router.get("/nombre/:nombre", obtenerLibrosPorNombre);

router.put("/:id", actualizarLibro);
router.delete("/:id", eliminarLibro);

export default router;
