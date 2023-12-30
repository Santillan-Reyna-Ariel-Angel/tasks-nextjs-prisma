import React from 'react';
import { prisma } from '@/libs/prisma';
import TaskCard from '@/components/TaskCard';

const loadTasks = async () => {
  // 1ra Forma (Extrayendo datos directamente de la BD) : ideal si la bd esta en el mismo proyecto
  const tasksList = await prisma.tasks.findMany(); // extrae todas las tareas de la BD de la tabla tasks
  // console.log(tasksList);

  // 2da Forma (Consumiendo la API): Es el mas utilizado, ya que la BD suele estar en un proyecto de backend diferente(separado)
  // const response = await fetch('http://localhost:3000/api/tasks/');
  // const tasksList = await response.json();
  // console.log(tasksList);

  return tasksList;
};

const HomePage = async () => {
  const tasksList = await loadTasks();

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasksList.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
