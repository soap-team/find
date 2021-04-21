import React from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import { 
  Typography,
  Grid,
  MenuItem,
  Select,
  Paper,
  Box,
  TextField,
} from '@material-ui/core';

function Action() {
  const [action, setAction] = React.useState(10);

  const handleChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <Box component={Paper} variant="outlined" px={2} pt={2}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography component="label" htmlFor="action-type" variant="subtitle1">Type</Typography>
            </Grid>
            <Grid item xs>
              <Select id="action-type" size="small" variant="outlined" value={action} onChange={handleChange} fullWidth>
                <MenuItem value={10}>Log to Discord</MenuItem>
                <MenuItem value={20}>Delete</MenuItem>
                <MenuItem value={30}>Lock (thread only)</MenuItem>
                <MenuItem value={40}>Reply single line</MenuItem>
                <MenuItem value={50}>Reply custom</MenuItem>
                <MenuItem value={40}>Move to category</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
        {
          action === 10 &&
          <>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <Typography component="label" htmlFor="log-text" variant="subtitle1">Text</Typography>
                </Grid>
                <Grid item xs>
                  <TextField id="log-text" size="small" variant="outlined" fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <Typography component="label" htmlFor="log-webhook" variant="subtitle1">Webhook URL</Typography>
                </Grid>
                <Grid item xs>
                  <TextField id="log-webhook" size="small" variant="outlined" fullWidth />
                </Grid>
              </Grid>
            </Grid>
          </>
        }
      </Grid>
    </Box>
  );
}

export default Action;
