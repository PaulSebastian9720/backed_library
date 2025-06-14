import path from "path";
import { Storage } from "@google-cloud/storage";

const keyPath = path.join(__dirname, "../../key.json");
const storage = new Storage({ keyFilename: keyPath });
const bucket = storage.bucket("bdbooks");

async function subirArchivo(
  filePath: string,
  nombreDestino: string
): Promise<string> {
  await bucket.upload(filePath, {
    destination: nombreDestino,
  });

  return `https://storage.googleapis.com/${bucket.name}/${nombreDestino}`;
}

export async function subirImagen(filePath: string): Promise<string> {
  // const ext = path.extname(filePath).toLowerCase();
  // const extensionesValidas = [".jpg", ".jpeg", ".png", ".webp"];
  // if (!extensionesValidas.includes(ext)) {
  //   throw new Error("El archivo no es una imagen válida");
  // }

  const nombreDestino = `imagenes/${path.basename(filePath)}`;
  return subirArchivo(filePath, nombreDestino);
}

export async function subirPDF(filePath: string): Promise<string> {
  // const ext = path.extname(filePath).toLowerCase();
  // if (ext !== ".pdf") {
  //   throw new Error("El archivo no es un PDF");
  // }
  let nombreDestino = `pdfs/${path.basename(filePath)}`;
  if (!nombreDestino.toLowerCase().endsWith(".pdf")) {
    nombreDestino += ".pdf";
  }
  return subirArchivo(filePath, nombreDestino);
}
