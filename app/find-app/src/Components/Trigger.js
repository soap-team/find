import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  TextField,
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Action from '../components/Action';

function Trigger(props) {
  const { id, triggers, setTriggers, error, setError } = props;
  const {
    discThread,
    discReply,
    artCommThread,
    artCommReply,
    messWallThread,
    messWallReply,
    repPost,
  } = triggers[id];

  const handleWikisChange = (event) => {
    const newTriggers = [...triggers];
    newTriggers[id].wikis = event.target.value.split("\n");
    setTriggers(newTriggers);
  };

  const handleTriggersChange = (event) => {
    const newArray = [...triggers];
    newArray[id]["triggers"][event.target.name] = event.target.checked;
    setTriggers(newArray);
  };

  const handleNewAction = () => {
    const newArray = [...triggers];
    newArray[id].actions = [...newArray[id].actions, {
      type: 1,
      text: "",
      url: "",
    }];
    setTriggers(newArray);
  }

  return (  
    <Box component={Paper} mb={2} p={2} variant="outlined">
      <Grid container spacing={3} className="triggerSection">
        <Grid item xs={4}>
          <Box mb={2}>
            <Typography component="label" htmlFor="trigger-wikis" variant="subtitle1">Wikis</Typography>
            <TextField id="trigger-wikis" multiline rows={5} variant="outlined" onBlur={handleWikisChange} fullWidth/>
          </Box>
          <FormControl component="fieldset" fullWidth>
            <Typography component="legend" variant="subtitle1">Triggers</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="default" checked={discThread} onChange={handleTriggersChange} name="discThread" />}
                label="discussion thread"
              />
              <FormControlLabel
                control={<Checkbox color="default" checked={discReply} onChange={handleTriggersChange} name="discReply" />}
                label="discussion reply"
              />
              <FormControlLabel
                control={<Checkbox color="default" checked={artCommThread} onChange={handleTriggersChange} name="artCommThread" />}
                label="article comment thread"
              />
              <FormControlLabel
                control={<Checkbox color="default" checked={artCommReply} onChange={handleTriggersChange} name="artCommReply" />}
                label="article comment reply"
              />
              <FormControlLabel
                control={<Checkbox color="default" checked={messWallThread} onChange={handleTriggersChange} name="messWallThread" />}
                label="message wall thread"
              />
              <FormControlLabel
                control={<Checkbox color="default" checked={messWallReply} onChange={handleTriggersChange} name="messWallReply" />}
                label="message wall reply"
              />
              <FormControlLabel
                control={<Checkbox color="default" checked={repPost} onChange={handleTriggersChange} name="repPost" />}
                label="reported post"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Typography component="legend" variant="subtitle1">Actions (in order)</Typography>
          {triggers[id].actions.map((o, i) => <Action key={i} id={id} actionId={i} action={o} triggers={triggers} setTriggers={setTriggers} error={error} setError={setError}/>)}
          <Button variant="contained" type="button" onClick={handleNewAction}><AddIcon fontSize="small" /> Add new action</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Trigger;
