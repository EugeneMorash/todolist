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

    const [newTitle, setNewTitle] = useState<string>('')
    const onNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        errorTitle && setErrorTitle(false)
    };

    const [errorTitle, setErrorTitle] = useState<boolean>(false)

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
        if (newTitle.trim()) {
            props.createTaskHandler(newTitle.trim())
            setNewTitle('')
        } else {
            setErrorTitle(true)
        }
    };

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        (e.key === 'Enter') && onAddClickHandler()
    };


    return (
        <div>

            <h3>ToDo!</h3>
            <div>
                <input type="textarea"
                       onChange={onNewTitleHandler}
                       value={newTitle}
                       onKeyDown={onEnterHandler}
                />
                <button onClick={onAddClickHandler}>Create</button>
                <div style={{color: "red"}}>
                    {errorTitle && "Invalid value!"}
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