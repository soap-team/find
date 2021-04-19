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
} from '@material-ui/core';

function NavBar() {
  return (  
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container>
          <Grid item>
            <Typography component={Link} to="/" variant="h6" className="links" color="inherit">Discussions AbuseFilter</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit">Log out</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
