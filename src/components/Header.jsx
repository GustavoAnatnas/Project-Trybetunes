import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../Style/Header.css';
import Footer from './Footer';

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
    <>
      <header data-testid="header-component">
        <nav className="input-nav">
          <Link className="nav" to="/search" data-testid="link-to-search">
            Busca
          </Link>
          <Link className="nav" to="/favorites" data-testid="link-to-favorites">
            Favoritos
          </Link>
          <Link className="nav" to="/profile" data-testid="link-to-profile">
            Perfil
          </Link>
        </nav>
        <h2 className="welcome" data-testid="header-user-name">{`Bem Vindo, ${user}`}</h2>
      </header>
      <Footer />
    </>
  );
}
}

export default Header;
