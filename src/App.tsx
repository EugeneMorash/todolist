import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Todolist";


export type TAsksType = Array<TaskType>
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    // const [tasks, setTasks] = useState([
    //     {id: v1(), title: 'Water', isDone: false},
    //     {id: v1(), title: 'Milk', isDone: true},
    //     {id: v1(), title: 'Beer', isDone: true},
    //     {id: v1(), title: 'Lemonade', isDone: false},
    //     {id: v1(), title: 'Wine', isDone: false},
    //     {id: v1(), title: 'Juice', isDone: true},
    // ])

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const [filter, setFilter] = useState('all')

    const [todolists, setTodolists] = useState([
        {
            todolistID: todolistID_1,
            title: 'What to Eat',
            filter: 'all'
        },
        {
            todolistID: todolistID_2,
            title: 'What to Drink',
            filter: 'all'
        },
    ])

    const [tasks, setTAsks] = useState<TasksType>({
    [todolistID_1]: [
        {id: v1(), title: 'Carrot', isDone: false},
        {id: v1(), title: 'Meat', isDone: true},
        {id: v1(), title: 'Cabbage', isDone: false},
        {id: v1(), title: 'Ice Cream', isDone: true},
        {id: v1(), title: 'Sausage', isDone: true},
        {id: v1(), title: 'Soup', isDone: true},
],
    [todolistID_2]: [
        {id: v1(), title: 'Water', isDone: false},
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Lemonade', isDone: false},
        {id: v1(), title: 'Wine', isDone: false},
        {id: v1(), title: 'Juice', isDone: true},
],
})

    const changeStatusHandler = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone} : t))
    }

    const deleteTaskHandler = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const filterChangeHandler = (filter: FilterType) => {
        setFilter(filter)
    }

    let filteredTask = tasks
    if (filter === 'active') {
        filteredTask = tasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        filteredTask = tasks.filter(t => t.isDone)
    }

    const createTaskHandler = (title: string) => {
        const newTask = {
            id: v1(),
            title,
            isDone: false
        }

        setTasks([newTask, ...tasks])
    }

    return (
        <div>
            <Todolist
                tasks={filteredTask}
                filterForButton={filter}

                changeStatusHandler={changeStatusHandler}
                deleteTaskHandler={deleteTaskHandler}
                filterChangeHandler={filterChangeHandler}
                createTaskHandler={createTaskHandler}
            />
        </div>
    )
}

export default App;