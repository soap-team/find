import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
//import 'fontsource-roboto';
import Find from './Pages/Find';
import Filter from './Pages/Filter';
import NavBar from './Components/NavBar';
import './App.css';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#333',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <NavBar />
        <Container className="container">
          <Switch>
            <Route path="/" exact>
              <Find />
            </Route>
            <Route path="/:filterId">
              <Filter />
            </Route>
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
