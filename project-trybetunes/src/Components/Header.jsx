import React from 'react';
import { Route, Switch } from 'react-router';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Search from '../pages/Search';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

class Header extends React.Component {
  render() {
    return (
      <header data-testid="header-component">
        <Switch>
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/" component={ Login } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/search" component={ Search } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </header>
    );
  }
}

export default Header;
