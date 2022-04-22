import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import '../Style/Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      load: false,
      artist: '',
    };
  }

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({
      artist: value,
    });
  };

  getAlbuns = () => {
    this.setState({ load: true }, async () => {
      const { artist } = this.state;
      const request = await searchAlbumsAPI(artist);
      this.setState({
        searchFor: artist,
        artist: '',
        load: false,
        albuns: request,
      });
    });
  }

  render() {
    const {
      artist,
      load,
      albuns,
      searchFor,
    } = this.state;

    return (
      <div data-testid="page-search">
        <form className="Busca" action="">
          {
            load
              ? <Loading />
              : (
                <>
                  <input
                    className="search-input"
                    type="text"
                    value={ artist }
                    placeholder="Banda ou Artista"
                    onChange={ this.handleInput }
                    data-testid="search-artist-input"
                  />
                  <button
                    className="submit"
                    data-testid="search-artist-button"
                    type="submit"
                    disabled={ artist.length < 2 }
                    onClick={ this.getAlbuns }
                  >
                    Pesquisar
                  </button>
                </>
              )
          }
        </form>
        <Header />
        <div>
          {
            albuns
              ? (
                <>
                  <h2>
                    {`Resultado de álbuns de: ${searchFor}`}
                  </h2>
                  {
                    albuns.map((alb) => (
                      <div key={ alb.collectionId }>
                        <h2>{ alb.collectionName }</h2>
                        <p>{ alb.artistName }</p>
                        <Link
                          to={ `/album/${alb.collectionId}` }
                          data-testid={ `link-to-album-${alb.collectionId}` }
                        >
                          Album
                        </Link>
                        <img src={ alb.artworkUrl100 } alt={ alb.collectionName } />
                      </div>
                    ))
                  }
                </>
              )
              : ''
          }
          {
            albuns !== undefined && albuns.length === 0
              ? <p>Nenhum álbum foi encontrado</p>
              : ''
          }
        </div>
      </div>

    );
  }
}

export default Search;
