import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Profile from './Profile';
import Albums from './Albums';
import { ALBUM_DETAILS_URL, ALBUMS_URL, PROFILE_URL } from '../routeNames';
import AlbumDetails from './AlbumDetails';
import Home from '../shared/Home/Home';

const Authorized: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path={ALBUMS_URL} component={Albums} />
    <Route exact path={ALBUM_DETAILS_URL} component={AlbumDetails} />
    <Route exact path={PROFILE_URL} component={Profile} />
    <Redirect to={ALBUMS_URL} />
  </Switch>
);

export default Authorized;
