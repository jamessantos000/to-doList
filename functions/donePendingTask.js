import React, { useContext } from 'react'
import { TaskContext } from "../functions/context";

export default function HandleCheckBox(index){
    const { valueTask, newTask } = useContext(TaskContext)

    const handleCheckboxChange = (index) => {
        const newData = [...valueTask];
        newData[index][3] = !newData[index][3];
        newTask(newData);
    };

    return handleCheckboxChange

}