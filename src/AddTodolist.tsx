import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button, TextField } from "@material-ui/core";

export type PropsType = {
    addTodo: (title: string) => void
}

export function AddTodolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const onAddTodolistHandler = () => {
        if (newTitle.trim()) {
            props.addTodo(newTitle.trim())
            setNewTitle('')
        } else {
            setError(true)
        }
    };

    const onChangeNewTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        error && setError(false)
    };

    function onEnterHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            onAddTodolistHandler()
        }
    }

    return (
        <div style={{ marginLeft: 30, display: "flex", alignItems: "center" }}>
            <TextField id="outlined-basic"
                label="Enter new title"
                variant="filled"
                type="textarea"
                size='small'
                color='secondary'
                style={{ backgroundColor: "white", borderRadius: 5 }}

                onChange={onChangeNewTitleHandler}
                onKeyDown={onEnterHandler}
                value={newTitle}
            />
            <Button
                style={{ marginLeft: 10 }}
                variant="contained"
                color="default"
                size={"large"}
                onClick={onAddTodolistHandler}> Create</Button>
            <span style={{ color: "lightcoral", marginLeft: 10 }}>{error && "Please enter title"}</span>
        </div>
    );
}
