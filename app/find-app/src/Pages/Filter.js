import React from 'react';
import {
  Link,
  useParams,
} from 'react-router-dom';
import { 
  Typography,
  Grid,
  Button,
  TextareaAutosize,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import {UnControlled as CodeMirror} from 'react-codemirror2';
require('codemirror/lib/codemirror.css');
require('codemirror/theme/neat.css');
require('codemirror/mode/javascript/javascript.js');


function Filter() {
  const { filterId } = useParams();

  const [description, setDescription] = React.useState('');
  const [conditions, setConditions] = React.useState('');
  const [notes, setNotes] = React.useState('');
  const [flags, setFlags] = React.useState({
    visibility: false,
    status: false,
    deleted: false,
  });
  const { visibility, status, deleted } = flags;

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleConditionsChange = (event) => {
    // setConditions(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleFlagsChange = (event) => {
    setFlags({ ...flags, [event.target.name]: event.target.checked });
  };

  const handleSave = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography component="h1" variant="h4">Editing filter</Typography>
      <form autoComplete="off" onSubmit={handleSave}>
        <Grid container>
          <Grid container item xs={2} justify="flex-end" alignItems="center">
            <Typography>Filter ID:</Typography>
          </Grid>
          <Grid item xs>
            <Typography>{filterId}</Typography>
          </Grid>
          <Grid container item>
            <Grid container item xs={2} justify="flex-end" alignItems="center">
              <Typography component="label" htmlFor="description">Description:</Typography>
              <Typography component="i" variant="body2">(publicly viewable)</Typography>
            </Grid>
            <Grid item xs>
              <input id="description" onBlur={handleDescriptionChange} defaultValue={description} />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid container item xs={2} justify="flex-end" alignItems="center">
              <Typography component="span">Conditions: </Typography>
            </Grid>
            <Grid item>
              <CodeMirror
                defaultValue={conditions}
                onBlur={handleConditionsChange}
                options={{
                  lineNumbers: true
                }}
              />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid container item xs={2} justify="flex-end" alignItems="center">
              <Typography component="span">Notes:</Typography>
            </Grid>
            <Grid item xs>
              <TextareaAutosize aria-label="Notes" rowsMin={5} onBlur={handleNotesChange} defaultValue={notes} />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid container item xs={2} justify="flex-end" alignItems="center">
              <Typography component="span">Flags:</Typography>
            </Grid>
            <Grid item xs justify="flex-end" alignItems="center">
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={visibility} onChange={handleFlagsChange} name="visibility" />}
                  label="Hide details of this filter from public view"
                />
                <FormControlLabel
                  control={<Checkbox checked={status} onChange={handleFlagsChange} name="status" />}
                  label="Enable this filter"
                />
                <FormControlLabel
                  control={<Checkbox checked={deleted} onChange={handleFlagsChange} name="deleted" />}
                  label="Mark as deleted"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" type="submit">Save filter</Button>
      </form>
    </>
  );
}

export default Filter;
