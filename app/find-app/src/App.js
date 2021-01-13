import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Find from './Pages/Find';
import Filter from './Pages/Filter';

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
        <Switch>
          <Route path="/" exact>
            <Find />
          </Route>
          <Route path="/:filterId">
            <Filter />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
