"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function TaskCard({task}){
    const router = useRouter()
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)
    const [newDescription, setNewDescription] = useState(task.description)

    const handleDelete = async (id) =>{
        if (window.confirm("¿Estás seguro de eliminar esta tarea?")){
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
                method: "DELETE"
            })
            if(res.status === 204){
                router.refresh()
            }
        }
    }

    const handleDone = async (id) =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({done: !task.done})
        })
        if(res.ok){
            router.refresh()
        }
    }

    const handleUpdate = async (id) =>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({title: newTitle, description: newDescription})
        })
        if(res.ok){
            const data = await res.json()
            setNewTitle(data.title)
            setNewDescription(data.description)
            setEdit(false)
            router.refresh()
        }
    }

    return (
    <div className={twMerge(`bg-slate-600 px-4 py-3 mb-2 rounded-md
    text-slate-200 flex justify-between items-center`).replace(/\s+/g, ' ')}>
        <div className="felx flex-col">
            {
                !edit ? (
                    <h2 className="text-white font-bold">{newTitle}
                        {task.done && <span className="text-green-500 text-sm ml-2">✅ Done</span>}
                    </h2>
                ) : ( 
                    <input type = "text" placeholder={task.title} 
                    className={twMerge(`bg-slate-700 border-none 
                    outline-none text-white font-bold rounded-md p-2`).replace(/\s+/g, ' ')}
                    onChange={ e => setNewTitle(e.target.value)}/>
                )
            }
            {   
                !edit ? (<p>{newDescription}</p>)
                : (
                    <textarea placeholder={task.description} 
                    className={twMerge(`bg-slate-500 border-none 
                    outline-none text-white rounded-md p-2 w-full`).replace(/\s+/g, ' ')}
                    rows={1}
                    onChange={ e => setNewDescription(e.target.value)}/>
                  )
            }
                        
        </div>
        <div className="flex justify-between gap-x-2">
            {
                edit && (
                    <button className="bg-cyan-600 text-white rounded-md p-1"
                    onClick={() => handleUpdate(task.id)}>Guardar</button>
                )
            }
            <button className={"text-white rounded-md p-1" + (task.done ? " bg-gray-500" : " bg-green-500")} 
            onClick={() => handleDone(task.id)}>{task.done ? "Desmarcar" : "Marcar"}</button>
            <button className={twMerge(`bg-red-500 text-white 
            rounded-md p-1`).replace(/\s+/g, ' ')} onClick={() => handleDelete(task.id)}>Eliminar</button>
            <button className={twMerge(`bg-blue-500 text-white 
            rounded-md p-1 ml-2`).replace(/\s+/g, ' ')} onClick={() => setEdit(!edit)}>Editar</button>
        </div>
    </div>
)}
export default TaskCard;