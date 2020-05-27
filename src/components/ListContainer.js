import React, { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import todoList from './dummy'


const useStyles = makeStyles({
  root: {
    width: '50%',
    margin: '0 auto'
  },
  checkbox: {
    borderRadius: '10px'
  }
})

export const ListContainer = () => {
  const classes = useStyles()
  const [ list, setList ] = useState(todoList)
  const [ checked, setChecked ] = useState([])

  const handleToggle = (value) => {
    if (!checked.includes(value)){
      console.log("running")
      console.log(checked)
      return setChecked([...checked, value])
    }

    setChecked(checked.filter(el => el !== value))
    console.log(checked)
  }

  return (
    <List className={classes.root}>
      {list.map((el, i) => {
        return (
          <ListItem key={el.name} onClick={() => handleToggle(el.name)} >
            <ListItemIcon>
              <Checkbox 
                className={classes.checkbox}
                checked={checked.includes(el.name)}
               />
            </ListItemIcon>
            <ListItemText primary={el.name} />
            <ListItemSecondaryAction>
              <IconButton>
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}