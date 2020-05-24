import {gql} from 'apollo-boost';

export const SONGS_QUERY = gql`
      {
        songs {
          id
          title
        }
      }`;
export const ADD_SONG = gql`
      mutation AddSong($title: String!) {
        addSong(title: $title) {
          id
          title
        }
      }`;

export const DELETE_SONG = gql`
    mutation DeleteSongs($id: ID) {
      deleteSong(id: $id) {
        id
      }
    }`;

export const GET_SONG = gql`
    query GetSong($id: ID!) {
      song(id: $id) {
        id
        title
        lyrics {
          id
          content,
          likes
        }
      }
    }`;

export const ADD_LYRIC = gql`
    mutation AddLyricToSong($content: String!, $songId: ID!) {
      addLyricToSong(content:$content, songId: $songId) {
        id
        lyrics {
          id
          content,
          likes
        }
      }
    }`;

export const DELETE_LYRIC = gql`
    mutation RemoveLyricFromSong ($songId: ID! ,$lyricId: ID!){
      removeLyricFromSong(songId: $songId, lyricId: $lyricId) {
        id
        lyrics {
          id
        }
      }
    }`;

export const Like_Lyric = gql`
    mutation LikeLyric($id: ID!) {
      likeLyric(id: $id) {
        id
        likes
      }
    }`;
  