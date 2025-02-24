import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { DndContext, DragStartEvent, DragOverlay, DragEndEvent, useSensors, useSensor, PointerSensor, DragOverEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import { Column, Id, Task } from "../types";

import Container from "./Container.components";
import Taskcard from "./Taskcard.components";

function Kanban() {

    const [activeColumn, setActiveColumn] = useState<Column|null>(null);
    const [activeTask, setActiveTask] = useState<Task|null>(null);

    const [tasks, setTask] = useState<Task[]>([]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3
            }
        })
    )

    const [darkMode, setDarkMode] = useState(false);
    const [columns, setColumn] = useState<Column[]>([]);
    const columnId = useMemo(()=>columns.map((col)=>col.id),[columns])

    function createNewColumn(){
        const newColumn: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`
        };

        setColumn([...columns, newColumn]);
    }

    function generateId(){
        return Math.floor(Math.random()*100)
    }

    function deleteColumn(id: Id){
        const filteredColumns = columns.filter((col)=>col.id !== id);
        setColumn(filteredColumns);
        
        const newList = tasks.filter((t)=>t.columnId !== id);
        setTask(newList);   
    }

    function updateColumn(id: Id, title:string){
        const newColumn = columns.map(col=>{
            if(col.id !== id) return col; 
            return {...col, title};
        });

        setColumn(newColumn);
    }

    function createTask(columnId: Id){
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        };

        setTask([...tasks, newTask]);
    } 

    function updateTask(id: Id, content:string){
        const newTasks = tasks.map(task=>{
            if(task.id !== id) return task;
            return {...task, content}
        });

        setTask(newTasks);
    }

    function deleteTask(id: Id){
        const newList = tasks.filter((task)=>task.id !== id);
        setTask(newList);
    }

    function onDragStart(event: DragStartEvent){
        if(event.active.data.current?.type==="Column"){
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if(event.active.data.current?.type==="Task"){
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragOver(event: DragOverEvent){
        const {active, over} = event; 
        if(!over) return; 

        const activeId = active.id; 
        const overId = over.id; 

        if(activeId === overId) return; 

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if(isActiveTask && isOverTask){
            setTask((tasks)=>{
                const activeIndex = tasks.findIndex((tsk)=>tsk.id === activeId);
                const overIndex = tasks.findIndex((tsk)=>tsk.id === overId);  

                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                
                return arrayMove(tasks, activeIndex, overIndex);
            });
        }
        const isOverColumn = over.data.current?.type === "Column";

        if(isActiveTask && isOverColumn){
            setTask((tasks)=>{
                const activeIndex = tasks.findIndex((t)=>t.id === activeId);
                tasks[activeIndex].columnId = overId;
                return arrayMove(tasks, activeIndex, activeIndex)
            })
        }
    }

    function onDragEnd(event: DragEndEvent){

        setActiveColumn(null);
        setActiveTask(null);

        const {active, over} = event; 
        if(!over) return;

        const activeColumnId = active.id; 
        const overColumnId = over.id; 

        if(activeColumnId === overColumnId) return; 

        setColumn((columns)=>{
            const findActiveId = columns.findIndex(
                (col) => col.id === activeColumnId
            ); 

            const findOverId = columns.findIndex(
                (col) => col.id === overColumnId
            ); 

            return arrayMove(columns, findActiveId, findOverId)
        })


    }

    if(darkMode){

    return (

    <div className="h-[100vh] bg-gray-800">

        <DndContext 
        sensors={sensors} 
        onDragStart={onDragStart} 
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}>
        <div className="column-context">
            <SortableContext items={columnId}>
            {columns.map((col)=>(
                <Container column={col} 
                        deleteColumn={deleteColumn}
                        updateColumn={updateColumn}
                        createTask={createTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        tasks={tasks.filter((task)=>task.columnId === col.id)}
                        mode="dark"
                        />
            ))}
            </ SortableContext>
        </div>
        <i className="fi fi-br-add  add-column-context-dark"></i>
        <button className="add-column-button-dark" onClick={()=>{createNewColumn()}}>Add Column</button>

        <i className="fi fi-br-moon-stars w-12 text-white left-14 top-0.5 text-xl relative "></i>
        <button className="p-5 px-12 text-xl bg-black text-white rounded ring-pink-200 hover:ring-3 inset-0 mt-7 ml-4" onClick={()=>setDarkMode(currentValue => !currentValue)} >Day Mode</button>
        
        {createPortal(
        <DragOverlay>
            {activeColumn && (
                <Container
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasks.filter(
                (task) => task.columnId === activeColumn.id
            )}
            mode="dark"
                />
            )}
            {activeTask && (
                <Taskcard 
                    task={activeTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    mode="dark"
                    />
            )}
        </DragOverlay>,
        document.body
        )}
        </DndContext>

    </div>)
    }
    else
    {
        return (

            <div className="h-[100vh] bg-indigo-300">
        
                <DndContext 
                sensors={sensors} 
                onDragStart={onDragStart} 
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}>
                <div className="column-context">
                    <SortableContext items={columnId}>
                    {columns.map((col)=>(
                        <Container column={col} 
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                updateTask={updateTask}
                                deleteTask={deleteTask}
                                tasks={tasks.filter((task)=>task.columnId === col.id)}
                                mode="light"
                                />
                    ))}
                    </ SortableContext>
                </div>
                <i className="fi fi-br-add add-column-context-light  "></i>
                <button className="add-column-button-light" onClick={()=>{createNewColumn()}}>Add Column</button>
        
                <i className="i fi-bs-sun mode-shift-light-icon "></i>
                <button className="mode-shift-light-button" onClick={()=>setDarkMode(currentValue => !currentValue)}  >Night Mode</button>
                
                {createPortal(
                <DragOverlay>
                    {activeColumn && (
                        <Container
                        column={activeColumn}
                        deleteColumn={deleteColumn}
                        updateColumn={updateColumn}
                        createTask={createTask}
                        updateTask={updateTask}
                        deleteTask={deleteTask}
                        tasks={tasks.filter(
                        (task) => task.columnId === activeColumn.id
                    )}
                    mode="light"
                        />
                    )}
                    {activeTask && (
                        <Taskcard 
                            task={activeTask}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            mode="light"
                            />
                    )}
                </DragOverlay>,
                document.body
                )}
                </DndContext>
        
            </div>
        )
    }
}

export default Kanban;