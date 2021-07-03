import React from 'react';
import { 
  Typography,
  Grid,
  TextField,
} from '@material-ui/core';

function validateUrl(url) {
  if (!/^https:\/\/discord/g.test(url) || !/\/\d{18}\/.{68}$/g.test(url)) {
    return true;
  }
  return false;
}

function ActionLog(props) {
  const { id, actionId, triggers, setTriggers, error, setError } = props;
  const [urlError, setUrlError] = React.useState(false);

  const handleTextChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].actions[actionId].text = event.target.value;
    setTriggers(newTriggers);
  };

  const handleWebhookChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].actions[actionId].url = event.target.value;
    setTriggers(newTriggers);
    const isError = validateUrl(event.target.value);
    console.log(isError);
    setUrlError(isError);
    setError(error || isError);
  };

  return (
    <>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Typography component="label" htmlFor="log-text" variant="subtitle1">Text</Typography>
          </Grid>
          <Grid item xs>
            <TextField
              id="log-text"
              size="small"
              variant="outlined"
              onBlur={handleTextChange}
              defaultValue={triggers[id].actions[actionId].text}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item xs={3}>
            <Typography component="label" htmlFor="log-webhook" variant="subtitle1">Webhook URL</Typography>
          </Grid>
          <Grid item xs>
            <TextField
              id="log-webhook"
              size="small"
              variant="outlined"
              onBlur={handleWebhookChange}
              defaultValue={triggers[id].actions[actionId].url}
              error={urlError}
              helperText={urlError ? "An invalid webhook URL was provided." : ""}
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default ActionLog;
