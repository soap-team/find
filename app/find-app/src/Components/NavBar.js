import React from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import { 
  Typography,
  Button,
  AppBar,
  Toolbar,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import FandomHeartLogo from '../assets/Fandom_heart-logo.svg';
import Vector from '../assets/Vector.svg';

function NavBar(props) {
  const {theme, setTheme} = props;

  const handleThemeToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return (  
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography component={Link} to="/" variant="h6" className="links" color="inherit">
              <img src={Vector} alt="Fandom Heart Logo" />
              Discussions AbuseFilter
              </Typography>
          </Grid>
          <Grid item>
            <Tooltip title="Toggle light/dark theme">
              <IconButton aria-label="Toggle light/dark theme" onClick={handleThemeToggle}>
                {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />} 
              </IconButton>
            </Tooltip>
            <Button color="inherit">Log out</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
