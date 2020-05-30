import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"


function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
  },
}));

// const classes = useStyles()

const CommentModal = React.forwardRef((props, ref) => {
  const [ modalStyle ] = useState(getModalStyle)
  const classes = useStyles()

  return (
    <div ref={ref} style={modalStyle} className={classes.paper}>
      <h1>Form to be updated</h1>
    </div>
  )
})

export default CommentModal

