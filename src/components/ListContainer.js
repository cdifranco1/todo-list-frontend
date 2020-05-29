import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { TaskForm } from './TaskForm'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import todoList from './dummy'
import axios from "axios";


const useStyles = makeStyles({
  container: {
    position: 'relative',
    top: "100px",
    backgroundColor: "#FFFFFF",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    borderRadius: "5px"
  },
  root: {
    width: '100%',
    margin: '0 auto'
  }
})

export const ListContainer = () => {
  const classes = useStyles()
  const [ list, setList ] = useState([])
  const [ checked, setChecked ] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks")
      .then(res => {
        setList(res.data)
      })
  }, [])


  //control checked state and 
  const handleToggle = (task) => {
    const updatedTask = { ...task, completed: true }

    const updatedList = list.map(el => {
      if (el.id === task.id) {
        return updatedTask
      }
      return el 
    })

    setList(updatedList)
    axios
      .put(`http://localhost:8000/api/tasks/${task.id}`, updatedTask)
      .then(res => {
        console.log(res)
      })
  }

  const handleSubmit = (e, task) => {
    e.preventDefault()

    axios
      .post('http://localhost:8000/api/tasks', task)
      .then(res => {
        setList([ ...list, res.data])
      })
  }

  return (
    <Container className={classes.container}>
      <TaskForm handleSubmit={handleSubmit} />
      <List className={classes.root}>
        {list.map((el, i) => {
          return (
            <ListItem 
              key={el.id} 
              onClick={() => handleToggle(el)} 
              disabled={el.completed}
              >
              <ListItemIcon>
                <Checkbox 
                  className={classes.checkbox}
                  checked={el.completed}
                />
              </ListItemIcon>
              <ListItemText primary={el.task} />
              <ListItemSecondaryAction>
                <IconButton>
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
    </Container>
  )
}