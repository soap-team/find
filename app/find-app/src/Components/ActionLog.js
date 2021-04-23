import React from 'react';
import { 
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';

function ActionLog(props) {
  const { id, actionId, triggers, setTriggers } = props;

  const handleTextChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].actions[actionId].param1 = event.target.value;
    setTriggers(newTriggers);
  };

  const handleWebhookChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].actions[actionId].param2 = event.target.value;
    setTriggers(newTriggers);
  };

  return (
    <>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Typography component="label" htmlFor="log-text" variant="subtitle1">Text</Typography>
          </Grid>
          <Grid item xs>
            <TextField id="log-text" size="small" variant="outlined" onBlur={handleTextChange} fullWidth />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Typography component="label" htmlFor="log-webhook" variant="subtitle1">Webhook URL</Typography>
          </Grid>
          <Grid item xs>
            <TextField id="log-webhook" size="small" variant="outlined" onBlur={handleWebhookChange} fullWidth />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ActionLog;
