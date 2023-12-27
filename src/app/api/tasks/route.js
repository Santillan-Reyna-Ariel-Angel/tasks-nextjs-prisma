import { NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json('Obteniendo tareas...');
};

export const POST = () => {
  return NextResponse.json('Creando tareas...');
};
