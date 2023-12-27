import { NextResponse } from 'next/server';

export const GET = (request, { params }) => {
  //   console.log('Params task', params);
  return NextResponse.json(`Obteniendo tarea ${params.id}`);
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
