import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {withRouter} from "react-router-dom";
import {ADD_LYRIC} from '../queries/songs';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MusicNote from '@material-ui/icons/MusicNote';
import Button from '@material-ui/core/Button';

const LyricCreate = ({match: {params: {id}}}) => {
  const [lyric, setLyric] = useState('');
  const [addLyric] = useMutation(ADD_LYRIC);

  const handleOnChange = ({target: {value}}) => {
    setLyric(value);
  }

  const handleOnSubmit = e => {
    e.preventDefault();
    addLyric({
      variables: { songId: id, content: lyric }
    }).then(() => setLyric(''))
    .catch(error => console.log('error', error));
  }

  return (
    <div style={{marginTop: '2em'}}>
        <form onSubmit={handleOnSubmit}>
          <FormControl fullWidth>
              <InputLabel htmlFor='song-lyric'>Add a lyric*</InputLabel>
              <Input
                id='song-lyric'
                name="lyric"
                value={lyric}
                onChange={handleOnChange}
                required
                startAdornment={<InputAdornment position="start"><MusicNote /></InputAdornment>}
              />
              <Button style={{marginTop: '10px'}} type='submit' variant="contained" color="secondary">
                Create lyric
              </Button>
          </FormControl>
        </form>
    </div>
  );
}

export default withRouter(LyricCreate);