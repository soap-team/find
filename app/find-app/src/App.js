import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Find from './pages/Find';
import Filter from './pages/Filter';
import NavBar from './components/NavBar';
import './App.css';

const lightTheme = {
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
      textJustify: 'center',
    },
  },
  palette: {
    type: 'light',
  },
};

const darkTheme = {
  typography: {
    fontFamily: [
      'Open Sans',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
      textJustify: 'center',
    },
  },
  palette: {
    type: 'dark',
  },
};

function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme'));
  const appliedTheme = createMuiTheme(theme === 'light' ? lightTheme : darkTheme);

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <NavBar theme={theme} setTheme={setTheme} />
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
