import React from 'react';
import { ListContainer } from './components/ListContainer'
import './App.css';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  h1: {
    fontSize: "4rem",
    color: "#2b6cb0",
    backgroundColor: "#FFFFFF",
    padding: "2%",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    borderRadius: '5px'
  }
})

function App() {
  const classes = useStyles()

  return (
    <Container>
      <h1 className={classes.h1}>Another To-Do List</h1>
      <ListContainer />
    </Container>
  );
}

export default App;
