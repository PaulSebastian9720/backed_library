import { AppDataSource } from "./../config/datasource";
import { Libro } from "../entity/libro";
import { Request, Response } from "express";
// import fs from "fs";
import { Like } from "typeorm";
// import { subirImagen, subirPDF } from "../service/cloud.service";

const repo = AppDataSource.getRepository(Libro);

export const crearLibro = async (req: Request, res: Response) => {
  try {
    const { nombre, autor, descripcion, anioPublicacion, imagenUrl } = req.body;
    console.log(imagenUrl)
    const libro = repo.create({
      nombre,
      autor,
      descripcion,
      aniopublicacion: anioPublicacion,
      imagenurl: imagenUrl
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
