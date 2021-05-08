import React from 'react';
import { 
  Typography,
  Grid,
  MenuItem,
  Select,
  Paper,
  Box,
} from '@material-ui/core';
import ActionLog from './ActionLog';
import ActionReplySingleLine from './ActionReplySingleLine';
import ActionReplyCustom from './ActionReplyCustom';
import ActionMove from './ActionMove';

function Action(props) {
  const { id, actionId, action, triggers, setTriggers } = props;

  const handleChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].actions[actionId] = {};
    newTriggers[id].actions[actionId].type = event.target.value;
    switch (event.target.value) {
      case 1:
        newTriggers[id].actions[actionId].text = "";
        newTriggers[id].actions[actionId].url = "";
        break;
      case 4:
        newTriggers[id].actions[actionId].reply = "";
        break;
      case 5:
        newTriggers[id].actions[actionId].json = "";
        break;
      case 6:
        newTriggers[id].actions[actionId].categoryId = "";
        break;
      default:
        break;
    }
    setTriggers(newTriggers);
  };

  return (
    <Box component={Paper} variant="outlined" mb={2} p={2}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item xs={3}>
              <Typography component="label" htmlFor="action-type" variant="subtitle1">Type</Typography>
            </Grid>
            <Grid item xs>
              <Select id="action-type" size="small" variant="outlined" value={action.type} onChange={handleChange} fullWidth>
                <MenuItem value={1}>Log to Discord</MenuItem>
                <MenuItem value={2}>Delete</MenuItem>
                <MenuItem value={3}>Lock (thread only)</MenuItem>
                <MenuItem value={4}>Reply single line</MenuItem>
                <MenuItem value={5}>Reply custom</MenuItem>
                <MenuItem value={6}>Move to category</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
        {action.type === 1 && <ActionLog id={id} actionId={actionId} triggers={triggers} setTriggers={setTriggers} />}
        {action.type === 4 && <ActionReplySingleLine id={id} actionId={actionId} triggers={triggers} setTriggers={setTriggers} />}
        {action.type === 5 && <ActionReplyCustom id={id} actionId={actionId} triggers={triggers} setTriggers={setTriggers} />}
        {action.type === 6 && <ActionMove id={id} actionId={actionId} triggers={triggers} setTriggers={setTriggers} />}
      </Grid>
    </Box>
  );
}

export default Action;
