import { useMemo, useState } from "react";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../types";
import {CSS} from '@dnd-kit/utilities';

import Taskcard from "./Taskcard.components";

interface Props {
    mode: String;
    column: Column;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title:string) => void;

    tasks: Task[];
    createTask: (columnId: Id) => void;
    updateTask: (id: Id, content: string) => void;
    deleteTask: (id: Id) => void;
}

function Container({mode, column, deleteColumn, updateColumn, tasks, createTask, updateTask, deleteTask}:Props){

    const [editMode, setEditMode] = useState(false);

    const {setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        },
        disabled: editMode
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    const taskIDs = useMemo(()=>{
        return tasks.map((task)=>task.id);
    }, [tasks]);

    if(isDragging){
        return <div ref={setNodeRef}
                style={style}
                className="column-shadow"></div>
    }

    if(mode=="dark"){

    return(
        <div      
        ref={setNodeRef}
        style={style}
        className="column-body-dark">
        <div className="column-header-dark text-md">
            <div className={"column-title-textbox " + !editMode ? "opacity-0" : "opacity-100"}>
            </div>
            <div
                {...attributes}
                {...listeners}
            onClick={()=>{
                setEditMode(true)
            }}
            >
                {!editMode && column.title}
                {editMode && <input 
                            autoFocus 
                            onBlur={()=>setEditMode(false)} 
                            value={column.title}
                            onChange={(e)=>updateColumn(column.id, e.target.value)}
                            onKeyDown={(e)=>{
                                if(e.key !== "Enter") return; 
                                setEditMode(false);
                            }}
                            className="column-edit-mode"  
                            />}
            </div>
            <i className="fi fi-br-trash column-trash-dark" onClick={()=>{deleteColumn(column.id)}}></i>
            </div>

        <div className="flex-grow">
        <SortableContext items={taskIDs}>
            {
                tasks.map((task)=>(
                    
                    <Taskcard key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask}
                    mode="dark"/>
                ))
            }
            </SortableContext>
        </div>
        <div className="add-task-button-dark" onClick={()=>{
                createTask(column.id)
            }}>
            <i className="fi fi-br-add add-task-plus-dark"></i>
            <button>Add Task</button>
        </div>
        </div>
    )
}

else {
        return(
            <div      
            ref={setNodeRef}
            style={style}
            className="column-body-light">
            <div className="column-header-light text-md">
                <div className={"column-title-textbox " + !editMode ? "opacity-0" : "opacity-100"}>
                </div>
                <div
                    {...attributes}
                    {...listeners}
                onClick={()=>{
                    setEditMode(true)
                }}
                >
                    {!editMode && column.title}
                    {editMode && <input 
                                autoFocus 
                                onBlur={()=>setEditMode(false)} 
                                value={column.title}
                                onChange={(e)=>updateColumn(column.id, e.target.value)}
                                onKeyDown={(e)=>{
                                    if(e.key !== "Enter") return; 
                                    setEditMode(false);
                                }}
                                className="column-edit-mode"  
                                />}
                </div>
                <i className="fi fi-br-trash column-trash-light" onClick={()=>{deleteColumn(column.id)}}></i>
                </div>
    
            <div className="flex-grow">
            <SortableContext items={taskIDs}>
                {
                    tasks.map((task)=>(
                        
                        <Taskcard key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask}
                        mode="light"/>
                    ))
                }
                </SortableContext>
            </div>
            <div className="add-task-button-light" onClick={()=>{
                    createTask(column.id)
                }}>
                <i className="fi fi-br-add add-task-plus-light"></i>
                <button>Add Task</button>
            </div>
            </div>
        )
}
}

export default Container;