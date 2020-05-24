import React from 'react';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {Link} from "react-router-dom";
import {SONGS_QUERY, DELETE_SONG} from '../queries/songs';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

const SongsList = () => {
  const {loading, error, data, refetch} = useQuery(SONGS_QUERY);
  const [deleteSong] = useMutation(DELETE_SONG);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleDeleteSong = id => {
      deleteSong({
        variables: { id }
      }).then(() => refetch())
      .catch(error => console.log('error', error));
  }

  const songs = () => {
    if (!data.songs.length) {
      return (<li style={{textAlign: 'center'}} className="collection-item"><Typography variant="h6">No songs to show:(</Typography></li>);
    }

    return data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
          <Typography variant="h6">
            <Link
            to={`/songs/${id}`}
            style={{textDecoration: 'none'}}
            >{title}
            </Link>
            <DeleteIcon 
            color='secondary'
            style={{ cursor: 'pointer', float: 'right', marginTop: '4px' }} 
            id={id} 
            onClick={() => handleDeleteSong(id)} 
            />
          </Typography>
      </li>
    ));
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Songs
      </Typography>
      <ul className="collection">
        { songs() }
      </ul>
      <Link
        to='/songs/new'
        >
        <Fab style={{marginTop: '10px' }} color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default SongsList;