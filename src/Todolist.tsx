import React, {ChangeEvent, CSSProperties, KeyboardEvent, useState} from 'react';
import {FilterType, TAsksType} from "./App";



export type PropsType = {
    tasks: TAsksType
    filterForButton: string

    changeStatusHandler: (id: string, isDone: boolean) => void
    deleteTaskHandler: (id: string) => void
    filterChangeHandler: (filter: FilterType) => void
    createTaskHandler: (title: string) => void
}

const checkedStyle: CSSProperties = {
    opacity: 0.5,
    textDecoration: 'line-through'
}

export function Todolist(props: PropsType) {

    const [newTask, setNewTask] = useState<string>('')
    const [invalidTitle, setInvalidTitle] = useState<boolean>(false)

    const onAllClickHandler = () => {
        props.filterChangeHandler('all')
    };

    const onActiveClickHandler = () => {
        props.filterChangeHandler('active')
    };

    const onCompletedClickHandler = () => {
        props.filterChangeHandler('completed')
    };

    const onCreateHandler = () => {
        if (newTask.trim()) {
            props.createTaskHandler(newTask.trim())
            setNewTask('')
        } else {
            setInvalidTitle(true)
        }
    };

    const onChangeNewTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
        invalidTitle && setInvalidTitle(false)
    };

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && onCreateHandler()
    };

    return (


        <div>
            <h3>ToDo!</h3>
            <div>
                <input type="textarea"
                       onChange={onChangeNewTaskHandler}
                       onKeyDown={onEnterHandler}
                       value={newTask}
                />
                <button onClick={onCreateHandler}>Create</button>
                <div style={{color: 'red'}}>
                    {invalidTitle && 'Invalid value!'}
                </div>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatusHandler(t.id, e.currentTarget.checked)
                    };

                    const OnDeleteHandler = () => {
                        props.deleteTaskHandler(t.id)
                    };

                    return (
                        <li key={t.id} style={{listStyle: 'none'}}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                            <span style={t.isDone ? checkedStyle : {}}>{t.title}</span>
                            <button style={{margin: 5}} onClick={OnDeleteHandler}>X</button>

                        </li>
                    )
                })}
            </ul>
            <button onClick={onAllClickHandler}
                    style={props.filterForButton === 'all' ? {backgroundColor: 'lightblue'} : {}}>All
            </button>
            <button onClick={onActiveClickHandler}
                    style={props.filterForButton === 'active' ? {backgroundColor: 'lightblue'} : {}}>Active
            </button>
            <button onClick={onCompletedClickHandler}
                    style={props.filterForButton === 'completed' ? {backgroundColor: 'lightblue'} : {}}>Completed
            </button>
        </div>
    );
}
