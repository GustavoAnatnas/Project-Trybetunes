import propTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    const { verifyFavorite } = this.props;
    this.state = {
      load: false,
      favorit: verifyFavorite,
    };
  }

  favoriteSong = () => {
    this.setState({
      load: true,
    }, async () => {
      const { music } = this.props;
      await addSong({ music });
      this.setState({ load: false });
    });
  }

  verifyCheck = ({ target }) => {
    const { checked } = target;
    this.setState({
      favorit: checked,
    }, async () => {
      const { favoriteMusics } = this.props;
      if (checked === true) this.favoriteSong();
      await favoriteMusics();
    });

    if (checked === true) this.favoriteSong();
  }

  render() {
    const {
      load,
      favorit,
    } = this.state;
    const {
      previewUrl,
      trackName,
      trackId,
    } = this.props;
    return (
      <>
        {load ? <Loading /> : ''}
        <h1>{ trackName }</h1>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="check">
          Favorita
          <input
            name="check"
            type="checkbox"
            checked={ favorit }
            onChange={ this.verifyCheck }
            data-testid={ `checkbox-music-${trackId}` }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  music: propTypes.objectOf(propTypes.any).isRequired,
  trackName: propTypes.string.isRequired,
  verifyFavorite: propTypes.bool.isRequired,
  favoriteMusics: propTypes.func.isRequired,
};

export default MusicCard;
