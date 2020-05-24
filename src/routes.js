import SongsList from './components/SongsList';
import SongsCreate from './components/SongsCreate';
import SongsDetail from './components/SongsDetail';

export default [
  {
    path: '/',
    name: 'SongsList',
    component: SongsList
  },
  {
    path: '/songs/new',
    name: 'SongsCreate',
    component: SongsCreate
  },
  {
    path: '/songs/:id',
    name: 'SongsDetail',
    component: SongsDetail
  }
];