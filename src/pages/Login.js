import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginName: '',
      isSaveButtonDisabled: true,
      isLoading: false,
    };
  }

  enableButton = () => {
    const { loginName } = this.state;
    const minLength = 3;
    const name = loginName.length < minLength;
    this.setState({
      isSaveButtonDisabled: name,
    });
  };

  inputChange = ({ target }) => {
    const { name, value } = target;
    return this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  onSaveButtonClick = async () => {
    const { loginName } = this.state;
    const { history } = this.props;
    this.setState(({ isLoading: true }));
    await createUser({ name: loginName });
    history.push('/search');
  };

  render() {
    const { loginName, isSaveButtonDisabled, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <label htmlFor="login-name-input">
          Nome
          <input
            data-testid="login-name-input"
            id="login-name-input"
            type="text"
            name="loginName"
            value={ loginName }
            onChange={ this.inputChange }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ this.onSaveButtonClick }
        >
          Entrar
        </button>
        {isLoading && <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
