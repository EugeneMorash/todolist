import React, {ChangeEvent} from 'react';
import {FilterType, TasksType} from "./App";

export type PropsType = {
    tasks: TasksType

    changeFilterStatus: (filter: FilterType) => void
    removeTaskHandler: (id: string) => void
    changeStatusHandler: (id: string, isDone: boolean) => void

}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilterStatus('all')
    };

    const onActiveClickHandler = () => {
        props.changeFilterStatus('active')
    };

    const onCompleteClickHandler = () => {
        props.changeFilterStatus('completed')
    };

    return (
        <div>

            <h3>ToDo!</h3>
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
