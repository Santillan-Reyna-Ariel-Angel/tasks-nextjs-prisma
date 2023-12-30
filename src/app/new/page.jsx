'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const NewPage = ({ params }) => {
  const router = useRouter();
  const [task, setTask] = useState({ title: '', description: '' });
  console.log('task', task);

  // useEffect() para que ni bien cargue la pagina se se consulte a la api los datos de la tarea que se quiere editar (llega el ide por params)
  useEffect(() => {
    if (params.id) {
      // Se uso then por que no se puede usar await en useEffect a no ser que creemos una función asíncrona
      fetch(`/api/tasks/${params.id}`)
        .then((response) => response.json())
        .then((data) =>
          setTask({ title: data.title, description: data.description })
        );
    }
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (params.id) {
      const response = await fetch(`/api/tasks/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: task.title,
          description: task.description,
        }), // esta el body(datos) que se enviara
        headers: {
          'Content-Type': 'application/json', // * IMPORTANTE: DE esta manera especificamos al servidor que se envía un json
        },
      });

      const data = await response.json();
      console.log('PUT:', data);
    } else {
      // * IMPORTANTE: Aquí se envía la petición a la BD ("/api/tasks/"  no es necesario el http://localhost:3000/ porque estamos en el mismo proyecto dentro de un componente cliente. El navegador lo completa automáticamente)
      // ! Si estuviésemos en un proyecto diferente o en un componente servidor, si sería necesario especificar el http://localhost:3000/
      const response = await fetch('/api/tasks/', {
        method: 'POST',
        body: JSON.stringify({
          title: task.title,
          description: task.description,
        }), // esta el body(datos) que se enviara
        headers: {
          'Content-Type': 'application/json', // * IMPORTANTE: DE esta manera especificamos al servidor que se envía un json
        },
      });

      const data = await response.json();
      // console.log('POST:', data);
    }

    router.refresh(); // Esto refrescará la página(internamente, no se recargara la pagina muy conveniente) para que la memoria cache no interfiera con el PUT (actualización de datos)
    router.push('/');
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="bg-slate-800 p-10 lg:w-1/4 md:w-1/2" onSubmit={onSubmit}>
        <label htmlFor="title" className="font-bold text-sm">
          Titulo de la tarea
        </label>
        <input
          value={task.title}
          type="text"
          id="title"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Titulo"
          onChange={(event) => setTask({ ...task, title: event.target.value })}
        />

        <label htmlFor="description" className="font-bold text-sm">
          Descripción de la tarea
        </label>
        <textarea
          value={task.description}
          rows="3"
          id="description"
          className="border border-gray-400 p-2 mb-4 w-full text-black"
          placeholder="Describe tu tarea"
          onChange={(event) =>
            setTask({ ...task, description: event.target.value })
          }
        ></textarea>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Crear tarea
        </button>
      </form>
    </div>
  );
};

export default NewPage;
