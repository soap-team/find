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
} from '@material-ui/core';
import Action from '../components/Action';

function Trigger(props) {
  const { id, triggers, setTriggers } = props;
  //const [wikis, setWikis] = React.useState('');
  // const [triggers, setTriggers] = React.useState({
  //   discThread: false,
  //   discReply: false,
  //   artCommThread: false,
  //   artCommReply: false,
  //   messWallThread: false,
  //   messWallReply: false,
  //   repPost: false,
  // });
  const {
    discThread,
    discReply,
    artCommThread,
    artCommReply,
    messWallThread,
    messWallReply,
    repPost,
    actions,
  } = triggers[id];
  //const [actions, setActions] = React.useState([{id:1}]);

  const handleWikisChange = (event) => {
    // setWikis(event.target.value);
    const newTriggers = [...triggers];
    newTriggers[id].wikis = event.target.value;
    setTriggers(newTriggers);
  };

  const handleTriggersChange = (event) => {
    //setTriggers({ ...triggers, [event.target.name]: event.target.checked });
    const newArray = [...triggers];
    newArray[id][event.target.name] = event.target.checked;
    setTriggers(newArray);
  };

  const handleNewAction = () => {
    const newArray = [...triggers];
    newArray[id].actions = [...newArray[id].actions, {type: 1}];
    setTriggers(newArray);
  }

  return (  
    <Paper variant="outlined">
      <Grid container spacing={3} className="triggerSection">
        <Grid item xs={4}>
          <Typography variant="subtitle1">Wikis</Typography>
          <TextField id="filter-wikis" multiline rows={5} variant="outlined" onBlur={handleWikisChange} fullWidth/>
          
          <FormControl component="fieldset" fullWidth>
            <Typography variant="subtitle1">Triggers</Typography>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={discThread} onChange={handleTriggersChange} name="discThread" />}
                label="discussion thread"
              />
              <FormControlLabel
                control={<Checkbox checked={discReply} onChange={handleTriggersChange} name="discReply" />}
                label="discussion reply"
              />
              <FormControlLabel
                control={<Checkbox checked={artCommThread} onChange={handleTriggersChange} name="artCommThread" />}
                label="article comment thread"
              />
              <FormControlLabel
                control={<Checkbox checked={artCommReply} onChange={handleTriggersChange} name="artCommReply" />}
                label="article comment reply"
              />
              <FormControlLabel
                control={<Checkbox checked={messWallThread} onChange={handleTriggersChange} name="messWallThread" />}
                label="message wall thread"
              />
              <FormControlLabel
                control={<Checkbox checked={messWallReply} onChange={handleTriggersChange} name="messWallReply" />}
                label="message wall reply"
              />
              <FormControlLabel
                control={<Checkbox checked={repPost} onChange={handleTriggersChange} name="repPost" />}
                label="reported post"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1">Actions (in order)</Typography>
          {triggers[id].actions.map((o, i) => <Action key={i} id={id} actionId={i} action={o} triggers={triggers} setTriggers={setTriggers} />)}
          <Button variant="contained" color="primary" type="button" onClick={handleNewAction}>+ Add new action</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Trigger;
