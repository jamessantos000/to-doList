import React, { useContext } from 'react'
import { TaskContext } from "../functions/context";

export default function DelTask(){
    const { valueTask, newTask } = useContext(TaskContext)

    const deleteTask = (item) => {
        const index = parseInt(item.originalIndex)
        const task = valueTask[index]
        newTask(valueTask.filter(tasks => tasks != task ));
    };

    return deleteTask

}