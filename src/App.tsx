import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";

export type TasksType = Array<TaskType>

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'


function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'Water', isDone: false},
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Lemonade', isDone: false},
        {id: v1(), title: 'Wine', isDone: false},
        {id: v1(), title: 'Juice', isDone: true},
    ])


//     const [tasks, setTAsks] = useState<TasksType>({
//     [todolistID_1]: [
//         {id: v1(), title: 'Carrot', isDone: false},
//         {id: v1(), title: 'Meat', isDone: true},
//         {id: v1(), title: 'Cabbage', isDone: false},
//         {id: v1(), title: 'Ice Cream', isDone: true},
//         {id: v1(), title: 'Sausage', isDone: true},
//         {id: v1(), title: 'Soup', isDone: true},
// ],
//     [todolistID_2]: [
//         {id: v1(), title: 'Water', isDone: false},
//         {id: v1(), title: 'Milk', isDone: true},
//         {id: v1(), title: 'Beer', isDone: true},
//         {id: v1(), title: 'Lemonade', isDone: false},
//         {id: v1(), title: 'Wine', isDone: false},
//         {id: v1(), title: 'Juice', isDone: true},
// ],
//
// })

    const [filter, setFilter] = useState('all')
    const changeFilterStatus = (filter: FilterType) => {
        setFilter(filter)
    }

    let filteredTask = tasks
    if (filter === 'active') {
        filteredTask = tasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        filteredTask = tasks.filter(t => t.isDone)
    }

    const removeTaskHandler = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const changeStatusHandler = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => {
                return (
                    t.id === id ? {...t, isDone} : t
                )
            }
        ))
    }

    return (
        <div>
            <Todolist
                tasks={filteredTask}

                changeFilterStatus={changeFilterStatus}
                removeTaskHandler={removeTaskHandler}
                changeStatusHandler={changeStatusHandler}
            />
        </div>
    )

}

export default App;
