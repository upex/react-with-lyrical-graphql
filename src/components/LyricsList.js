import React from 'react';
import {withRouter} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import DeleteIcon from '@material-ui/icons/Delete';
import Badge from '@material-ui/core/Badge';
import {useMutation} from '@apollo/react-hooks';
import {Like_Lyric, DELETE_LYRIC} from '../queries/songs';

const LyricsList = ({lyrics = [], match: {params: {id: songId}}}) => {
  const [likeLyric] = useMutation(Like_Lyric);
  const [deleteLyric] = useMutation(DELETE_LYRIC);

  const renderLyrics = () => {
    if (!lyrics.length) {
      return (<li style={{textAlign: 'center'}} className="collection-item">
        <Typography variant="h6">No lyrics to show:(</Typography>
        </li>);
    }

    const handleLikeLyric = (id, likes) => {
      likeLyric({
        variables: {id},
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id,
            __typename: 'LyricType',
            likes: likes +1
          }
        }
      });
    };

    const handleDeleteLyric = id => {
      deleteLyric({
        variables: { lyricId: id, songId}
      });
    };

    return lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
          <Typography variant="h6">
            {content}
              <DeleteIcon 
              fontSize="small"
              color="secondary"
              style={{ cursor: 'pointer', float: 'right', margin: '6px 0 0 20px' }}
              onClick={() => handleDeleteLyric(id)} 
              />
              <Badge 
              style={{ cursor: 'pointer', float: 'right', marginTop: '6px' }} 
              badgeContent={likes} 
              color="primary"
              >
                <ThumbUp 
                fontSize="small"
                onClick={() => handleLikeLyric(id, likes)} 
                />
              </Badge>
          </Typography>
      </li>
    ));
  }

  return (
      <ul className="collection">
        { renderLyrics() }
      </ul>
  );
};

export default withRouter(LyricsList);