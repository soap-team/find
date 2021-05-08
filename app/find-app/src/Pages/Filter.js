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
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import {UnControlled as CodeMirror} from 'react-codemirror2';
import Trigger from '../components/Trigger';
import 'codemirror/addon/selection/active-line';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/zenburn.css';

function Filter(props) {
  const { theme } = props;
  const { filterId } = useParams();

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const [triggers, setTriggers] = React.useState([{
    wikis: [],
    triggers: {
      discThread: false,
      discReply: false,
      artCommThread: false,
      artCommReply: false,
      messWallThread: false,
      messWallReply: false,
      repPost: false,
    },
    actions: [{
      type: 1,
      text: "",
      url: "",
    }],
  }]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFilterChange = (editor, data, value) => {
    setFilter(value);
  };

  const handleNewTrigger = () => {
    const newTriggers = [...triggers, {
      wikis: [],
      triggers: {
        discThread: false,
        discReply: false,
        artCommThread: false,
        artCommReply: false,
        messWallThread: false,
        messWallReply: false,
        repPost: false,
      },
      actions: [{
        type: 1,
        text: "",
        url: "",
      }],
    }];
    setTriggers(newTriggers);
    console.log(newTriggers);
  }

  const handleSave = (event) => {
    event.preventDefault();
    console.log(name, description, filter, triggers);
  };

  return (
    <>
      <Typography component="h1" variant="h5">Filter #{filterId}</Typography>
      <Box component="form" autoComplete="off" onSubmit={handleSave} mt={2}>
        <Box mb={2}>
          <Typography component="label" htmlFor="filter-name" variant="subtitle1">Name</Typography>
          <TextField id="filter-name" variant="outlined" size="small" defaultValue={name} onBlur={handleNameChange} fullWidth />
        </Box>
        <Box mb={2}>
          <Typography component="label" htmlFor="filter-description" variant="subtitle1">Description</Typography>
          <TextField id="filter-description" multiline rows={5} variant="outlined" defaultValue={description} onBlur={handleDescriptionChange} fullWidth />
        </Box>
        <Box mb={2}>
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
        </Box>
        <Box>
          <Typography component="h2" variant="h5" width="auto">
            Triggers and Actions
            <Tooltip title="info">
              <InfoOutlinedIcon fontSize="small" />
            </Tooltip>
          </Typography>
          {triggers.map((o, i) => <Trigger key={i} id={i} triggers={triggers} setTriggers={setTriggers} />)}
        </Box>
        <Box>
          <Button variant="contained" color="primary" type="button" onClick={handleNewTrigger}><AddIcon fontSize="small" /> Add new trigger</Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <Button variant="contained" color="secondary" type="button" component={Link} to="/">Cancel</Button>
          <Box component={Button} variant="contained" color="primary" type="submit" ml={1}>Save</Box>
        </Box>
      </Box>
    </>
  );
}

export default Filter;