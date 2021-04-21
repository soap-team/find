import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Container,
  Box,
} from '@material-ui/core';
import Find from './pages/Find';
import Filter from './pages/Filter';
import NavBar from './components/NavBar';
import CssBaseline from '@material-ui/core/CssBaseline';
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
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  palette: {
    primary: {
      main: '#fff',
    },
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
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    subtitle1: {
      fontWeight: 700,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#424242',
    },
  },
};

function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem('theme'));
  const appliedTheme = createMuiTheme(theme === 'light' ? lightTheme : darkTheme);

  return (
    <ThemeProvider theme={appliedTheme}>
      <CssBaseline>
        <Router>
          <NavBar theme={theme} setTheme={setTheme} />
          <Box component={Container} mt={5}>
            <Switch>
              <Route path="/" exact>
                <Find />
              </Route>
              <Route path="/:filterId">
                <Filter theme={theme} />
              </Route>
            </Switch>
          </Box>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
  
}

export default App;
