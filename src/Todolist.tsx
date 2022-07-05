import React, {ChangeEvent, CSSProperties, KeyboardEvent, useState} from 'react';
import {FilterType, TasksType, TaskType} from "./App";
import {Button, ButtonGroup, Checkbox, IconButton, TextField, Typography} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";


export type PropsType = {
    tasks: Array<TaskType>
    filter: FilterType
    title: string

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
            <Typography variant="h4" component="h3">
                {props.title}
            </Typography>
            {/*<h3>ToDo!</h3>*/}
            <div>
                <form noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Enter new title" variant="outlined" type="textarea"
                               onChange={onChangeNewTaskHandler}
                               onKeyDown={onEnterHandler}
                               value={newTask}
                               size='small'
                    />
                    <Button variant="contained" color="primary" onClick={onCreateHandler}>Create</Button>
                </form>


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
                            <Checkbox checked={t.isDone} onChange={onChangeHandler}/>
                            <span style={t.isDone ? checkedStyle : {}}>{t.title}</span>
                            {/*<button style={{margin: 5}} onClick={OnDeleteHandler}>X</button>*/}

                            <IconButton onClick={OnDeleteHandler}
                                        aria-label='delete'
                                        color='secondary'>
                                <DeleteIcon fontSize='small'/>
                            </IconButton>

                        </li>
                    )
                })}
            </ul>

            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button onClick={onAllClickHandler}
                        style={props.filter === 'all' ? {backgroundColor: 'lightblue'} : {}}>All
                </Button>
                <Button onClick={onActiveClickHandler}
                        style={props.filter === 'active' ? {backgroundColor: 'lightpink'} : {}}>Active
                </Button>
                <Button onClick={onCompletedClickHandler}
                        style={props.filter === 'completed' ? {backgroundColor: 'lightgreen'} : {}}>Completed
                </Button>
            </ButtonGroup>


        </div>
    );
}
