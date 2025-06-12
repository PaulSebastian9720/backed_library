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
const upload = multer({ dest: "uploads/" });

router.get("/", obtenerLibros);
router.get("/:id", obtenerLibro);
router.get("/nombre/:nombre", obtenerLibrosPorNombre);
router.post("/", upload.single("imagen"), crearLibro);
router.put("/:id", actualizarLibro);
router.delete("/:id", eliminarLibro);

export default router;
