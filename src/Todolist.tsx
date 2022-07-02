import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType} from "./App";

export type PropsType = {
    tasks: TasksType

    changeFilterStatus: (filter: FilterType) => void
    removeTaskHandler: (id: string) => void
    changeStatusHandler: (id: string, isDone: boolean) => void
    createTaskHandler: (title: string) => void

}

export function Todolist(props: PropsType) {

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [errorTaskTitle, setErrorTaskTitle] = useState<boolean>(false)

    const onAllClickHandler = () => {
        props.changeFilterStatus('all')
    };

    const onActiveClickHandler = () => {
        props.changeFilterStatus('active')
    };

    const onCompleteClickHandler = () => {
        props.changeFilterStatus('completed')
    };

    const onAddClickHandler = () => {
        if (taskTitle.trim()) {
        props.createTaskHandler(taskTitle.trim())
        setTaskTitle('')
        } else {
            setErrorTaskTitle(true)
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        errorTaskTitle && setErrorTaskTitle(false)
    };

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if (e.key === 'Enter') {
        //     onAddClickHandler()
        // }

        (e.key === 'Enter') && onAddClickHandler()

    };

    const activeButtonStyle = {
        backgroundColor: 'lightblue'
    }

    return (
        <div>

            <h3>ToDo!</h3>
            <div>
                <input type="textarea"
                       onChange={onNewTitleChangeHandler}
                       value={taskTitle}
                       onKeyDown={onEnterHandler}
                />
                <button onClick={onAddClickHandler}>Create</button>
                <div style={{color: "red"}}>
                    {errorTaskTitle && 'Invalid value!'}
                </div>
            </div>
            <ul>
                {props.tasks.map((t) => {

                    const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatusHandler(t.id, e.currentTarget.checked)
                    };

                    const onDeleteHandler = () => {
                        props.removeTaskHandler(t.id)
                    };

                    return (

                        <li key={t.id} style={{listStyle: 'none'}}>

                            <input type="checkbox" checked={t.isDone} onChange={onchangeHandler}/>
                            <span>{t.title}</span>
                            <button style={{margin: 5}} onClick={onDeleteHandler}>X</button>
                        </li>
                    )
                })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompleteClickHandler}>Completed</button>
            </div>

        </div>
    );
}
