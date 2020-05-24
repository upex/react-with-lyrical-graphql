import React from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {useQuery} from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import {GET_SONG} from '../queries/songs';
import ArrowBackwardIcon from '@material-ui/icons/ArrowBack';
import LyricCreate from './LyricCreate';
import LyricsList from './LyricsList';

const SongsDetail = ({match: {params: { id }}}) => {
  const {loading, error, data} = useQuery(GET_SONG, { variables: {id}});

  if (loading) return <p style={{textAlign: 'center'}}>Loading...</p>;

  if (error || !data.song) {
    return (
      <ul className="collection">
        <li style={{textAlign: 'center'}} className="collection-item">
          <Typography variant="h6">No song found :(</Typography>
        </li>
      </ul>);
  }

  return (
    <div className='song-create-wrapper'>
      <Typography style={{textTransform: 'capitalize'}} variant="h4" gutterBottom>
           {data.song.title}
      </Typography>
      <LyricsList lyrics={data.song.lyrics} />
      <LyricCreate />
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
    </div>
  );
}

export default SongsDetail;