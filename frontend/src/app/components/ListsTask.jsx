import TaskCard from "./TaskCard"

async function loadTasks(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`)
    const tasks = await res.json()
    console.log(tasks)
    return tasks
}
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