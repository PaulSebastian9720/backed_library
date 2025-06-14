import { AppDataSource } from "./../config/datasource";
import { Libro } from "../entity/libro";
import { Request, Response } from "express";
import fs from "fs";
import { Like } from "typeorm";
import { subirImagen, subirPDF } from "../service/cloud.service";

const repo = AppDataSource.getRepository(Libro);

export const crearLibro = async (req: Request, res: Response) => {
  try {
    const { nombre, autor, descripcion, anioPublicacion } = req.body;
    const files = req.files as {
      imagen?: Express.Multer.File[];
      pdf?: Express.Multer.File[];
    };

    if (!files?.imagen?.[0]) {
      res.status(400).json({ msg: "Se requiere una imagen" });
      return;
    }

    const imagenFile = files.imagen[0];
    const pdfFile = files?.pdf?.[0];

    const imagenUrl = await subirImagen(imagenFile.path);

    let pdfUrl = "";
    if (pdfFile) {
      pdfUrl = await subirPDF(pdfFile.path);
    }

    const deletePromises = [fs.promises.unlink(imagenFile.path)];
    if (pdfFile) deletePromises.push(fs.promises.unlink(pdfFile.path));
    await Promise.all(deletePromises);

    const libro = repo.create({
      nombre,
      autor,
      descripcion,
      anioPublicacion,
      imagenUrl,
      pdfUrl,
    });

    await repo.save(libro);
    res.json(libro);
  } catch (err) {
    console.error("Error al crear libro:", err);
    res.status(500).json({ msg: "Error al crear libro", error: err });
  }
};

export const obtenerLibros = async (_: Request, res: Response) => {
  const libros = await repo.find();
  res.json(libros);
};

export const obtenerLibro = async (req: Request, res: Response) => {
  const libro = await repo.findOneBy({ id: Number(req.params.id) });
  if (!libro) {
    res.status(404).json({ msg: "Libro no encontrado" });
    return;
  }
  res.json(libro);
};

export const obtenerLibrosPorNombre = async (req: Request, res: Response) => {
  try {
    const nombre = req.params.nombre;

    const libros = await repo.find({
      where: { nombre: Like(`%${nombre}%`) },
    });

    if (libros.length === 0) {
      res.status(404).json({ msg: "No se encontraron libros con ese nombre" });
      return;
    }

    res.json(libros);
  } catch (error) {
    res.status(500).json({ msg: "Error al obtener los libros", error });
  }
};

export const actualizarLibro = async (req: Request, res: Response) => {
  const libro = await repo.findOneBy({ id: Number(req.params.id) });
  if (!libro) {
    res.status(404).json({ msg: "Libro no encontrado" });
    return;
  }
  repo.merge(libro, req.body);
  await repo.save(libro);
  res.json(libro);
};

export const eliminarLibro = async (req: Request, res: Response) => {
  const result = await repo.delete(req.params.id);
  res.json(result);
};
