import propTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      load: false,
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
    if (checked === true) this.favoriteSong();
  }

  render() {
    const {
      load,
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
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.favoriteSong }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  music: propTypes.shape({}).isRequired,
  trackName: propTypes.string.isRequired,
};

export default MusicCard;
