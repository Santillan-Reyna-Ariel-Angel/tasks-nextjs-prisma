import { PrismaClient } from '@prisma/client'; // Importamos la clase que nos permitirá conectarnos a la base de datos

export const prisma = new PrismaClient(); // De esta manera nos podemos conectar a la base de datos
