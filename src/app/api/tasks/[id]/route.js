import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export const GET = async (request, { params }) => {
  //   console.log('Params task', params);

  // * De esta manera consultamos un registro(único) en la tabla "Tasks" que declaramos en schema.prisma
  const task = await prisma.tasks.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  // console.log('task', task);

  return NextResponse.json(task);
};

export const POST = (request, { params }) => {
  console.log('Params task', params);
  return NextResponse.json(`Creando tarea ${params.id}`);
};

export const PUT = (request, { params }) => {
  console.log('Params task', params);
  return NextResponse.json(`Actualizando tarea ${params.id}`);
};

export const DELETE = (request, { params }) => {
  console.log('Params task', params);
  return NextResponse.json(`Eliminado tarea ${params.id}`);
};
