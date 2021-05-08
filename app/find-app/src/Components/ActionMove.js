import React from 'react';
import { 
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';

function ActionMove(props) {
  const { id, actionId, triggers, setTriggers } = props;

  const handleCategoryChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].actions[actionId].categoryId = event.target.value;
    setTriggers(newTriggers);
  };

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography component="label" htmlFor="move" variant="subtitle1">Category ID</Typography>
        </Grid>
        <Grid item xs>
          <TextField id="move" size="small" variant="outlined" onBlur={handleCategoryChange} fullWidth />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ActionMove;
