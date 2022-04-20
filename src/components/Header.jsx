import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      load: true,
    };
  }

  componentDidMount() {
    this.userInfo();
  }

userInfo = async () => {
  const user = await getUser();

  this.setState({
    user: user.name,
    load: false,
  });
}

render() {
  const {
    user,
    load,
  } = this.state;

  if (load) {
    return <Loading />;
  }
  return (
    <header data-testid="header-component">
      <p data-testid="header-user-name">{`Bem Vindo, ${user}`}</p>
      <nav>
        <Link to="/search" data-testid="link-to-search">
          Busca
        </Link>
        <Link to="/favorites" data-testid="link-to-favorites">
          Favoritos
        </Link>
        <Link to="/profile" data-testid="link-to-profile">
          Perfil
        </Link>
      </nav>
    </header>

  );
}
}

export default Header;
