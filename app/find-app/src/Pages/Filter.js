import React from 'react';
import {
  useParams,
  Link,
} from 'react-router-dom';
import { 
  Typography,
  Button,
  TextField,
  Tooltip,
  Paper,
  Grid,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

function Filter() {
  const { filterId } = useParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [triggers, setTriggers] = React.useState({
    discThread: false,
    discReply: false,
    artCommThread: false,
    artCommReply: false,
    messWallThread: false,
    messWallReply: false,
    repPost: false,
  });
  const {
    discThread,
    discReply,
    artCommThread,
    artCommReply,
    messWallThread,
    messWallReply,
    repPost,
  } = triggers;

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTriggersChange = (event) => {
    setTriggers({ ...triggers, [event.target.name]: event.target.checked });
  };

  const handleSave = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography component="h1" variant="h4">Filter #{filterId}</Typography>
      <form autoComplete="off" onSubmit={handleSave} className="filter-form">
        <div className="filter-form-item">
          <Typography component="label" htmlFor="filter-name">Name</Typography>
          <TextField id="filter-name" variant="outlined" size="small" defaultValue={name} onBlur={handleNameChange} fullWidth />
        </div>
        <div className="filter-form-item">
          <Typography component="label" htmlFor="filter-description">Description</Typography>
          <TextField id="filter-description" multiline rows={5} variant="outlined" defaultValue={description} onBlur={handleDescriptionChange} fullWidth />
        </div>
        <div className="filter-form-item">
          <Typography component="p">Filter</Typography>
          <Paper variant="outlined">
            <CodeMirror
              options={{
                mode: 'xml',
                lineNumbers: true
              }}
              onChange={(editor, data, value) => {
              }}
            />
          </Paper>
        </div>
        <div className="filter-form-item">
          <Typography component="h2" variant="h5">
            Triggers and Actions
            <Tooltip title="info">
              <InfoOutlinedIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <Paper variant="outlined">
            <Grid container>
              <Grid item>
                Wikis
                <TextField id="filter-wikis" multiline rows={5} variant="outlined" fullWidth/>
                
                <FormControl component="fieldset">
                  <Typography component="p">Triggers</Typography>
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
                  <FormHelperText>You can display an error</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                Actions (in order)
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div className="filter-form-buttons">
          <Button variant="contained" color="secondary" type="button" component={Link} to="/">Cancel</Button>
          <Button variant="contained" color="primary" type="submit" onSubmit={handleSave}>Save</Button>
        </div>
      </form>
    </>
  );
}

export default Filter;