import React from 'react'
import { BrowserRouter as Router, Switch, Route }from"react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav";
import HomePage from './pages/HomePage.jsx';
import ProjectPage from './pages/ProjectPage.jsx';
import LoginPage from './pages/LoginPage';

function App () {
  return (
        <Router>
        <div>
        <Nav />
        <Switch>
            <Route path="/project/:id">
            <ProjectPage />
            </Route>
            <Route path="/login">
            <LoginPage />
            </Route>
            <Route path="/">
            <HomePage />
            </Route>
        </Switch>
        </div>
        </Router>
        );
    }
export default App;