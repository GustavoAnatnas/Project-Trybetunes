import React from 'react';
import Header from './Header';
import '../Style/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      bttnDisable: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const minNumber = 2;
    const { value } = event.target;
    if (value.length >= minNumber) {
      this.setState({
        bttnDisable: false,
      });
    }
  }

  render() {
    const {
      bttnDisable,
    } = this.state;
    return (
      <div data-testid="page-search">
        <form className="Busca" action="">
          <input
            className="search-input"
            type="text"
            placeholder="Banda ou Artista"
            onChange={ this.onInputChange }
            data-testid="search-artist-input"
          />
          <button
            className="submit"
            data-testid="search-artist-button"
            type="submit"
            disabled={ bttnDisable }
          >
            Pesquisar
          </button>
        </form>
        <Header />
      </div>

    );
  }
}

export default Search;
