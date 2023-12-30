'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const NewPage = () => {
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    // console.log(title, description);

    // * IMPORTANTE: Aquí se envía la petición a la BD ("/api/tasks/"  no es necesario el http://localhost:3000/ porque estamos en el mismo proyecto dentro de un componente cliente. El navegador lo completa automáticamente)
    // ! Si estuviésemos en un proyecto diferente o en un componente servidor, si sería necesario especificar el http://localhost:3000/
    const response = await fetch('/api/tasks/', {
      method: 'POST',
      body: JSON.stringify({ title: title, description: description }), // esta el body(datos) que se enviara
      headers: {
        'Content-Type': 'application/json', // * IMPORTANTE: DE esta manera especificamos al servidor que se envía un json
      },
    });

    const data = await response.json();
    console.log(data);

    router.push('/');
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-bold text-sm">
          Titulo de la tarea
        </label>
        <input
          type="text"
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Titulo"
        />

        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la tarea
        </label>
        <textarea
          rows="3"
          id="description"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Describe tu tarea"
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Crear tarea
        </button>
      </form>
    </div>
  );
};

export default NewPage;
