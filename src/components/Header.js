import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState(({
      user,
      isLoading: false,
    }));
  }

  render() {
    const { user, isLoading } = this.state;
    return (
      <header
        data-testid="header-component"
      >
        <nav>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </nav>
        <p
          data-testid="header-user-name"
        >
          { user.name }
        </p>
        {isLoading && <Loading />}
      </header>
    );
  }
}

export default Header;
