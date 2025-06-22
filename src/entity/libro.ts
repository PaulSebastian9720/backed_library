// src/entity/Libro.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  autor!: string;

  @Column("text")
  descripcion!: string;

  @Column()
  anioPublicacion!: number;

  @Column()
  imagenUrl!: string;
}
