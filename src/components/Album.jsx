import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import getMusic from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const request = await getMusic(match.params.id);
    const search = request.filter((req) => req.kind === 'song');
    const favor = await getFavoriteSongs();
    this.setState({
      musics: search,
      albums: request[0],
      load: false,
      fav: favor,
    });
  }

  favoriteMusics = async () => {
    const musics = await getFavoriteSongs();
    this.setState({
      fav: musics,
    });
  }

  verifyFavorite = (e) => {
    const { fav } = this.state;
    const truth = fav.some((f) => f.trackId === e);
    if (truth === true) {
      return true;
    }
    return false;
  }

  render() {
    const {
      albums,
      load,
      musics,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { load ? <Loading /> : (
          <>
            <div>
              <h1
                data-testid="artist-name"
              >
                {albums.artistName}
              </h1>
              <p
                data-testid="album-name"
              >
                {albums.collectionName}
              </p>
            </div>
            <div>
              {
                musics.map((mus) => (
                  <MusicCard
                    key={ mus.trackId }
                    trackName={ mus.trackName }
                    previewUrl={ mus.previewUrl }
                    trackId={ mus.trackId }
                    music={ mus }
                    favoriteMusics={ this.favoriteMusics }
                    verifyFavorite={ this.verifyFavorite(mus.trackId) }
                  />
                ))
              }
            </div>
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
