import React from 'react';
import { ListContainer } from './components/ListContainer';
import Login from './components/LoginForm';
import './App.css';
import { Route } from "react-router-dom";
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  h1: {
    fontSize: "3rem",
    color: "#2b6cb0",
    backgroundColor: "#FFFFFF",
    padding: "2%",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    textAlign: "center",
    borderRadius: '5px',
    width: "70%",
    margin: "3% auto"
  },
})

function App() {
  const classes = useStyles()

  return (
    <Container>
      <h1 className={classes.h1}>Another To-Do List</h1>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" >
        <Login registration />
      </Route>
      <Route path="/home" component={ListContainer} />
    </Container>
  );
}

export default App;
