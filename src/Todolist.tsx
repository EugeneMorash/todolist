import React, {ChangeEvent, CSSProperties, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "./App";
import {Button, ButtonGroup, Checkbox, IconButton, TextField, Typography} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {ClearRounded as ClearIcon} from '@material-ui/icons/';
import {EditableSpan} from "./EditableSpan";


export type PropsType = {
    tasks: Array<TaskType>
    filter: FilterType
    title: string
    todolistID: string

    changeStatusHandler: (todolistID: string, id: string, isDone: boolean) => void
    deleteTaskHandler: (todolistID: string, id: string) => void
    deleteTodolistHandler: (todolistID: string) => void
    filterChangeHandler: (todolistID: string, filter: FilterType) => void
    createTaskHandler: (todolistID: string, title: string) => void
}

const checkedStyle: CSSProperties = {
    opacity: 0.5,
    textDecoration: 'line-through'
}



export function Todolist(props: PropsType) {

    const [newTask, setNewTask] = useState<string>('')
    const [invalidTitle, setInvalidTitle] = useState<boolean>(false)

    const onAllClickHandler = () => {
        props.filterChangeHandler(props.todolistID, 'all')
    };

    const onActiveClickHandler = () => {
        props.filterChangeHandler(props.todolistID, 'active')
    };

    const onCompletedClickHandler = () => {
        props.filterChangeHandler(props.todolistID, 'completed')
    };

    const onCreateHandler = () => {
        if (newTask.trim()) {
            props.createTaskHandler(props.todolistID, newTask.trim())
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

    const OnDeleteTaskHandler = () => {
        props.deleteTodolistHandler(props.todolistID)
    };

    const onChangeTitleTodolist = (title: string) => {

    }

    return (

        <div>
            <Typography variant="h4" component="h3">
                <EditableSpan onChangeTitle={onChangeTitleTodolist}>
                    {props.title}
                </EditableSpan>
                <IconButton onClick={OnDeleteTaskHandler}
                            aria-label='delete'
                            color='secondary'>
                    <ClearIcon fontSize='large'/>
                </IconButton>
            </Typography>

            <div>
                    <TextField id="outlined-basic" label="Enter new title" variant="outlined" type="textarea"
                               onChange={onChangeNewTaskHandler}
                               onKeyDown={onEnterHandler}

                               value={newTask}
                               size='small'
                    />
                    <Button variant="contained"
                            color="primary"
                            onClick={onCreateHandler}
                    >
                        Create
                    </Button>


                <div style={{color: 'red'}}>
                    {invalidTitle && 'Invalid value!'}
                </div>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatusHandler(props.todolistID, t.id, e.currentTarget.checked)
                    };

                    const OnDeleteHandler = () => {
                        props.deleteTaskHandler(props.todolistID, t.id)
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
