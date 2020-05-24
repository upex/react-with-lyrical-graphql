import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {Link} from "react-router-dom";
import {SONGS_QUERY, ADD_SONG} from '../queries/songs';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MusicNote from '@material-ui/icons/MusicNote';
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

const SongsCreate = ({history}) => {
  const [title, setTitle] = useState('');
  const [addSong] = useMutation(ADD_SONG);

  const handleOnChange = ({target: {value}}) => {
    setTitle(value);
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    addSong({
      variables: { title },
      refetchQueries: [{ query: SONGS_QUERY, variables: {}}]
    }).then(() => history.push('/'))
    .catch(error => console.log('error', error));
    setTitle('');
  }

  return (
    <div className='song-create-wrapper'>
        <Typography variant="h4" gutterBottom>
           Create new song
        </Typography>
        <form onSubmit={handleOnSubmit}>
          <FormControl fullWidth>
              <InputLabel htmlFor='song-title'>Song Title*</InputLabel>
              <Input
                id='song-title'
                name="title"
                value={title}
                onChange={handleOnChange}
                required
                startAdornment={<InputAdornment position="start"><MusicNote /></InputAdornment>}
              />
              <Button style={{marginTop: '10px'}} type='submit' variant="contained" color="secondary">
                Create song
              </Button>
          </FormControl>
          <Link
            style={{float: 'left', margin: '1em 0', textDecoration: 'none'}}
            to='/'
            >
              <Button
                color="primary"
                startIcon={<ArrowBackwardIcon />}
                >
                Back
              </Button>
          </Link>
        </form>
    </div>
  );
}

export default SongsCreate;