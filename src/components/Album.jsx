import React from 'react';
import propTypes from 'prop-types';
import Header from './Header';
import getMusic from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

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
    this.setState({
      musics: search,
      albums: request[0],
      load: false,
    });
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
