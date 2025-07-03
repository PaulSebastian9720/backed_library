# Etapa 1: Compilar TypeScript
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y tsconfig.json e instalar dependencias
COPY package*.json tsconfig.json ./
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Compilar TypeScript a la carpeta build/
RUN npm run build

# Etapa 2: Imagen ligera para producción
FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

# Exponer el puerto de la app
EXPOSE 3000

# Ejecutar el servidor
CMD ["node", "build/index.js"]
