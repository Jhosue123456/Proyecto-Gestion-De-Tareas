"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { twMerge } from "tailwind-merge";

function FormTask(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter()
    const handleSubmit = async (e) =>{
        e.preventDefault()
        console.log(title, description)
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                description
            })
        })
        const data = await res.json()
        console.log(data)
        router.refresh()
    }
    return(
        <div className="bg-slate-200 p-7 h-fit">
            <form onSubmit={handleSubmit}>
                <h1 className="text-black font-bold" >Añadir Tarea</h1>
                <label htmlFor="title" className="text-xs text-black">Title</label>
                <input type="text" name="title" id="title"
                className={twMerge(`bg-slate-400 rounded-md p-2 mb-2 block w-full
                text-slate-900`).replace(/\s+/g, ' ')}
                onChange={e => setTitle(e.target.value)}/>
                <label htmlFor="Description" className="text-xs text-black">Description</label>
                <textarea name="Description" id="Description"
                className={twMerge(`bg-slate-400 rounded-md p-2 mb-2 block w-full
                text-slate-900`).replace(/\s+/g, ' ')} 
                onChange={e => setDescription(e.target.value)}></textarea>
                <button className={twMerge(`bg-indigo-500 text-white rounded-md
                 p block w-full`).replace(/\s+/g, ' ')}>Save</button>
            </form>
        </div>
    )
}
export default FormTask