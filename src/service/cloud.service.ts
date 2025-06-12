import path from "path";
import { Storage } from "@google-cloud/storage";

const keyPath = path.join(__dirname, "../../key.json");

const storage = new Storage({ keyFilename: keyPath });
const bucket = storage.bucket("bdbooks");

export async function subirImagen(
  filePath: string,
  nombreDestino: string
): Promise<string> {
  await bucket.upload(filePath, {
    destination: nombreDestino,
  });

  return `https://storage.googleapis.com/${bucket.name}/${nombreDestino}`;
}
