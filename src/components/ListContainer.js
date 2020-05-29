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
    top: "200px"
  },
  root: {
    width: '100%',
    margin: '0 auto'
  },
  checkbox: {
    borderRadius: '10px'
  },
  inputContainer: {
    width: '80%'
  },
})

export const ListContainer = () => {
  const classes = useStyles()
  const [ list, setList ] = useState(todoList)
  const [ checked, setChecked ] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tasks")
      .then(res => {
        setList(res.data)
      })
  }, [])

  const handleToggle = (task) => {
    if (!checked.includes(task)){

      console.log(checked)
      return setChecked([...checked, task])
    }

    setChecked(checked.filter(el => el.id !== task.id))
  }

  const handleSubmit = (e, task) => {
    e.preventDefault()
    console.log(task)

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
            <ListItem key={el.id} onClick={() => handleToggle(el)} >
              <ListItemIcon>
                <Checkbox 
                  className={classes.checkbox}
                  checked={checked.includes(el)}
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