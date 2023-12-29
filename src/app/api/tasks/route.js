import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const GET = async () => {
  const responseTasks = await prisma.tasks.findMany(); // De esta manera consultamos la tabla "Tasks" que declaramos en schema.prisma
  // console.log('responseTasks', responseTasks);
  return NextResponse.json(responseTasks);
};

export const POST = async (request, { params }) => {
  const response = await request.json(); //Recordar que en request se encuentra el body de la petición
  console.log('response: ', response);

  const taskCreated = await prisma.tasks.create({
    data: {
      title: response.title,
      description: response.description,
    },
  });

  return NextResponse.json(taskCreated);
};
