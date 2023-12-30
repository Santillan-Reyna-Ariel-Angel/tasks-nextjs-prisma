import NewPage from '@/app/new/page';
// *IMPORTANTE: Exportamos el componente que importamos; PERO ESTE SE MOSTRARA EN UNA "url" DIFERENTE ("/tasks/edit/id").
// * Esto se hace con el fin de poder reutilizar el componente "NewPage" en diferentes rutas y en base a dicha ruta crear o actualizar una tarea.
export default NewPage;
