import React, { useState, useEffect } from "react"
import CommentModal from "./CommentModal"
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent'
import { TaskForm } from './TaskForm'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import axios from "axios";
import { Modal } from "@material-ui/core";


const useStyles = makeStyles({
  container: {
    position: 'relative',
    top: "100px",
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
  const [ open, setOpen ] = useState(false)
  const classes = useStyles()
  const [ list, setList ] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks")
      .then(res => {
        setList(res.data)
      })
  }, [])

  const toggleOpen = () => {
    setOpen(!open)
  }


  //control checked state and 
  const handleToggle = (task) => {
    const updatedTask = { ...task, completed: !task.completed }

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

  const clearCompleted = () => {
    
    axios
    .delete('http://localhost:8000/api/tasks/batch/1')
    .then(res => {
      if (res.data > 0) setList(list.filter(el => !el.completed))
    })
  }

  return (
    <Container className={classes.container}>
      <TaskForm handleSubmit={handleSubmit} />
      <List className={classes.root}>
        {list.map((el, i) => {
          return (
            <ListItem
              className={classes.listItem} 
              key={el.id} 
              
              disabled={el.completed}
              >
              <ListItemIcon>
                <Checkbox 
                  color="primary"
                  className={classes.checkbox}
                  checked={el.completed}
                  onClick={() => handleToggle(el)} 
                />
              </ListItemIcon>
              <ListItemText primary={el.task} />
              <Modal
                open={open}
                onClose={toggleOpen}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{ opacity: '0.2'}}
              >
                <CommentModal />
              </Modal>
              <ListItemSecondaryAction>
                <IconButton  onClick={toggleOpen} >
                  <CommentIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
      {!list.every(el => el.completed === false) && 
        <Button onClick={clearCompleted} variant="contained" size="medium" color="primary">Clear Completed</Button>
      }
    </Container>
  )
}