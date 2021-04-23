import React from 'react';
import { 
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';

function ActionReplySingleLine(props) {
  const { id, actionId, triggers, setTriggers } = props;

  const handleReplyChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].actions[actionId].param1 = event.target.value;
    setTriggers(newTriggers);
  };

  return (
    <Grid item>
      <Grid container alignItems="center">
        <Grid item xs={3}>
          <Typography component="label" htmlFor="reply-single-line" variant="subtitle1">Reply</Typography>
        </Grid>
        <Grid item xs>
          <TextField id="reply-single-line" size="small" variant="outlined" onBlur={handleReplyChange} fullWidth />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ActionReplySingleLine;
