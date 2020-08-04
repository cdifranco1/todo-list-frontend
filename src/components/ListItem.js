import React, { useState, useEffect } from "react"
import CommentModal from "./CommentModal"
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';


const Task = ({ handleToggle, task, handleUpdate }) => { 
  const [ open, setOpen ] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <ListItem
      key={task.id} 
      disabled={task.completed}
      >
      <ListItemIcon>
        <Checkbox 
          color="primary"
          checked={task.completed}
          onClick={() => handleToggle(task)} 
        />
      </ListItemIcon>
      <ListItemText primary={task.task} />
      <CommentModal 
        toggleOpen={toggleOpen}
        handleUpdate={handleUpdate}
        open={open}
        task={task}
      />
      <ListItemSecondaryAction>
        <IconButton  onClick={toggleOpen} >
          <CommentIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default Task