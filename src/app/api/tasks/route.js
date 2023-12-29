import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const GET = async () => {
  const responseTasks = await prisma.tasks.findMany(); // De esta manera consultamos la tabla "Tasks" que declaramos en schema.prisma
  // console.log('responseTasks', responseTasks);
  return NextResponse.json(responseTasks);
};

// post === create
export const POST = async (request, { params }) => {
  const response = await request.json(); // * En request se encuentra el body de la petición (Los datos que nos llegan para crear el registro)
  console.log('response: ', response);

  // * De esta manera creamos un registro en la tabla "Tasks" que declaramos en schema.prisma
  const taskCreated = await prisma.tasks.create({
    data: {
      title: response.title,
      description: response.description,
    },
  });

  return NextResponse.json(taskCreated);
};
