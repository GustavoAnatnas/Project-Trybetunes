import React from 'react';
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
    </header>
  );
}
}

export default Header;
