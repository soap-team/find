import React from 'react';
import { 
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';

function ActionReplyCustom(props) {
  const { id, actionId, triggers, setTriggers } = props;

  const handleJSONChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].actions[actionId].json = event.target.value;
    setTriggers(newTriggers);
  };

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography component="label" htmlFor="reply-custom" variant="subtitle1">JSON</Typography>
        </Grid>
        <Grid item xs>
          <TextField id="reply-custom" size="small" variant="outlined" onBlur={handleJSONChange} fullWidth />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ActionReplyCustom;
