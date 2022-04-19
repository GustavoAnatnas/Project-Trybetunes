import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      load: false,
      bttnDisable: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onInputChange(event) {
    const minNumber = 3;
    const { value } = event.target;
    if (value.length >= minNumber) {
      this.setState({
        name: value,
        bttnDisable: false,
      });
    }
  }

  async onClick() {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      load: true,
    });
    await createUser({
      name,
    });
    history.push('/search');
  }

  render() {
    const {
      load,
      bttnDisable,
    } = this.state;
    return (
      <div data-testid="page-login">

        {
          load && <Loading />
        }

        <input
          name="login"
          type="text"
          data-testid="login-name-input"
          onChange={ this.onInputChange }
        />
        <button
          type="submit"
          data-testid="login-submit-button"
          disabled={ bttnDisable }
          onClick={ this.onClick }
        >
          Entrar
        </button>
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
