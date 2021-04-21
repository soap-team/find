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
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
} from '@material-ui/core';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import Action from '../components/Action';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/zenburn.css';

function Filter(props) {
  const { theme } = props;
  const { filterId } = useParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [wikis, setWikis] = React.useState('');
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

  const handleFilterChange = (editor, data, value) => {
    setFilter(value);
  };

  const handleWikisChange = (event) => {
    setWikis(event.target.value);
  };

  const handleTriggersChange = (event) => {
    setTriggers({ ...triggers, [event.target.name]: event.target.checked });
  };

  const handleSave = (event) => {
    event.preventDefault();
    console.log(name, description, filter, triggers, wikis);
  };

  return (
    <>
      <Typography component="h1" variant="h5">Filter #{filterId}</Typography>
      <form autoComplete="off" onSubmit={handleSave} className="filter-form">
        <div className="filter-form-item">
          <Typography component="label" htmlFor="filter-name" variant="subtitle1">Name</Typography>
          <TextField id="filter-name" variant="outlined" size="small" defaultValue={name} onBlur={handleNameChange} fullWidth />
        </div>
        <div className="filter-form-item">
          <Typography component="label" htmlFor="filter-description" variant="subtitle1">Description</Typography>
          <TextField id="filter-description" multiline rows={5} variant="outlined" defaultValue={description} onBlur={handleDescriptionChange} fullWidth />
        </div>
        <div className="filter-form-item">
          <Typography variant="subtitle1">Filter</Typography>
          <Paper variant="outlined">
            {
              theme === 'light' ? 
              <CodeMirror
                options={{
                  mode: 'xml',
                  lineNumbers: true,
                  theme: 'default',
                  styleActiveLine: true,
                }}
                onChange={(editor, data, value) => {
                }}
              /> : 
              <CodeMirror
                options={{
                  mode: 'xml',
                  lineNumbers: true,
                  theme: 'zenburn',
                  styleActiveLine: true,
                }}
                onChange={handleFilterChange}
              />
            }
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
            <Grid container spacing={3} className="triggerSection">
              <Grid item xs={4}>
                <Typography variant="subtitle1">Wikis</Typography>
                <TextField id="filter-wikis" multiline rows={5} variant="outlined" onBlur={handleWikisChange} fullWidth/>
                
                <FormControl component="fieldset">
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
                <Action />
                <Button variant="contained" color="primary" type="button">+ Add new action</Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <div>
          <Button variant="contained" color="primary" type="button">+ Add new trigger</Button>
        </div>
        <div className="filter-form-buttons">
          <Button variant="contained" color="secondary" type="button" component={Link} to="/">Cancel</Button>
          <Button variant="contained" color="primary" type="submit">Save</Button>
        </div>
      </form>
    </>
  );
}

export default Filter;