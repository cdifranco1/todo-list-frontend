import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';


const useStyles = makeStyles({
  inputContainer: {
    width: '80%',
    '& input': {
      padding: '1%'
    }
  },
  form: {
    padding: '2%',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '2px solid lightgray'
  }
})

const initialState = {
  userId: 1,
  task: ''
}

export const TaskForm = ({ handleSubmit }) => {
  const classes = useStyles()
  const [ task, setTask ] = useState(initialState)

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name] : e.target.value
    })
  }
  
  const onSubmit = (e) => {
    e.preventDefault()

    handleSubmit(e, task)
    setTask(initialState)
  }

  return (
    <>
      <form 
        className={classes.form} 
        onSubmit={onSubmit}
        >
        <TextField 
            placeholder="go to the grocery store"
            className={classes.inputContainer}
            variant='outlined'
            onChange={handleChange}
            name='task'
            value={task.task}
          /> 
        <Button 
          type="submit"
          color="primary"
          variant="outlined"
          disableRipple="true"
          >
            Add Task
          </Button>
      </form>
    </>
  )
}