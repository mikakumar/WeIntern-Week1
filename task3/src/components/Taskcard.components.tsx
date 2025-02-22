import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

import { Id, Task } from "../types";

interface Props{
    task: Task;
    updateTask: (id: Id, content:string) => void;
    deleteTask: (id: Id) => void;
    mode: String
}


function Taskcard({task, updateTask, deleteTask, mode}:Props){

    const [mouseCheck, setMouseCheck] = useState(false); 
    const [editMode, setEditMode] = useState(false);

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
            id: task.id,
            data: {
                type: "Task",
                task,
            },
            disabled: editMode
        });
    
        const style = {
            transition,
            transform: CSS.Transform.toString(transform)
        }

    const toggleEdits = () =>{
        setEditMode((prev)=>!prev);
        setMouseCheck(false);
    }

    if(isDragging){
       return(
        <div 
        ref={setNodeRef}
        style={style}   
        className="task-shadow" />
       )
    }

    if(mode=="dark"){

    if(editMode){
        return(
            <div 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task-edit-mode">
                <textarea className="task-title-edit"
                value={task.content}
                autoFocus
                placeholder="Enter Content"
                onBlur={toggleEdits}
                onKeyDown={(e)=>{
                    if(e.key === "Enter" && e.shiftKey) toggleEdits();
                }}
                onChange={(e)=>updateTask(task.id, e.target.value)}
                ></textarea>
        </div>
        )
    }

    return(
        <div 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEdits}
        onMouseEnter={()=>{
            setMouseCheck(true);
        }}
        onMouseLeave={()=>{
            setMouseCheck(false);
        }}
        className="task-hover-off-dark">
            {task.content}
            {mouseCheck && 
            <i className="fi fi-br-trash task-hover-on-dark" 
            onClick={()=>{
                deleteTask(task.id);
            }}
            ></i>
            }
        </div>
    )
}

else {
    if(editMode){
        return(
            <div 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task-edit-mode">
                <textarea className="task-title-edit"
                value={task.content}
                autoFocus
                placeholder="Enter Content"
                onBlur={toggleEdits}
                onKeyDown={(e)=>{
                    if(e.key === "Enter" && e.shiftKey) toggleEdits();
                }}
                onChange={(e)=>updateTask(task.id, e.target.value)}
                ></textarea>
        </div>
        )
    }

    return(
        <div 
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        onClick={toggleEdits}
        onMouseEnter={()=>{
            setMouseCheck(true);
        }}
        onMouseLeave={()=>{
            setMouseCheck(false);
        }}
        className="task-hover-off-light">
            {task.content}
            {mouseCheck && 
            <i className="fi fi-br-trash task-hover-on-light" 
            onClick={()=>{
                deleteTask(task.id);
            }}
            ></i>
            }
        </div>
    )
}

}

export default Taskcard;