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

// ! Crear una tarea a partir de una tarea en especifico no tiene sentido en este caso:
// export const POST = (request, { params }) => {
//   console.log('Params task', params);
//   return NextResponse.json(`Creando tarea ${params.id}`);
// };

// put === update
export const PUT = async (request, { params }) => {
  // console.log('Params task', params);

  const response = await request.json(); // * En request se encuentra el body de la petición (Los datos que nos llegan para actualizar el registro)

  const taskUpdate = await prisma.tasks.update({
    where: {
      id: Number(params.id),
    },
    data: response, // * En la propiedad data se envían los datos que se van a actualizar. El valor response para que se actualicen los campos que contenga (ya sea title, description o ambos)
  });

  return NextResponse.json(taskUpdate);
};

export const DELETE = async (request, { params }) => {
  // console.log('Params task', params);

  // * De esta manera eliminamos un registro(único) en la tabla "Tasks". El try catch es para manejar los errores
  try {
    const tasksDeleted = await prisma.tasks.delete({
      where: {
        id: Number(params.id),
      },
    });
    console.log('tasksDeleted', tasksDeleted);
    return NextResponse.json(tasksDeleted);
  } catch (error) {
    return NextResponse.json(error.message);
  }
};
