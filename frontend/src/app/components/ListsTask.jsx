import TaskCard from "./TaskCard"

async function loadTasks(){
    // Prioriza BACKEND_URL (http://backend:8000) para llamadas internas de Docker
    const baseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
    
    try {
        const res = await fetch(`${baseUrl}/api/tasks/`, { cache: 'no-store' });
        
        if (!res.ok) {
            console.error(`Error en la respuesta: ${res.status}`);
            return [];
        }
        
        return await res.json();
    } catch (error) {
        console.error("Error de conexión:", error);
        return []; // Retorna un array vacío para que el .map no falle
    }
}
// async function loadTasks(){
//     const baseUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL;
//     const res = await fetch(`${baseUrl}/api/tasks/`)
//     const tasks = await res.json()
//     console.log(tasks)
//     return tasks
// }
async function ListTask(){
    const tasks = await loadTasks()
    console.log(tasks)
    return(
        <div className="bg-slate-700 p-4 w-full">
            <h1>Lista de Tareas</h1>
            {Array.isArray(tasks) && tasks.map(task => (
                <TaskCard key={task.id} task={task}/>
            ))}
        </div>
    )
}
export default ListTask;