import React, { useState, useEffect } from "react"
import { TaskForm } from './TaskForm'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List';
import ListItem from "./ListItem"
import Button from '@material-ui/core/Button';
import { axiosInstance } from "../axios";



const useStyles = makeStyles({
  container: {
    position: 'relative',
    top: "100px",
    width: "70%",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    borderRadius: "5px",
    padding: '2%'
  },
  clearButton: {
    margin: '2%'
  },
  root: {
    width: '100%',
    margin: '0 auto'
  }
})

export const ListContainer = () => {
  const classes = useStyles()
  const [ list, setList ] = useState([])

  useEffect(() => {
    axiosInstance()
      .get("/api/tasks")
      .then(res => {
        setList(res.data)
      })
  }, [])

  const handleToggle = (task) => {
    const updatedTask = { ...task, completed: !task.completed }

    const updatedList = list.map(el => {
      if (el.id === task.id) {
        return updatedTask
      }
      return el 
    })

    setList(updatedList)

    handleUpdate(updatedTask)
  }

  const handleUpdate = (task) => {
    axiosInstance()
      .put(`/api/tasks/${task.id}`, task)
      .then(res => {
        console.log(res)
      })
  }

  const handleSubmit = (task) => {
    axiosInstance()
      .post('/api/tasks', task)
      .then(res => {
        setList([ ...list, res.data])
      })
  }

  const clearCompleted = () => {
    axiosInstance()
    .delete('/api/tasks/batch/1')
    .then(res => {
      if (res.data > 0) setList(list.filter(el => !el.completed))
    })
  }

  return (
    <Container className={classes.container}>
      <TaskForm handleSubmit={handleSubmit} />
      <List className={classes.root}>
        {list.map((el, i) => {
          return <ListItem
                    handleUpdate={handleUpdate}
                    key={el.id}
                    task={el}
                    handleToggle={handleToggle}
                    // handleChange={handleChange}
                  />
        })}
      </List>
      {!list.every(el => el.completed === false) && 
        <Button onClick={clearCompleted} variant="contained" size="medium" color="primary">Clear Completed</Button>
      }
    </Container>
  )
}