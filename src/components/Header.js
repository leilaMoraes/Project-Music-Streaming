import React, { Component } from 'react';
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
