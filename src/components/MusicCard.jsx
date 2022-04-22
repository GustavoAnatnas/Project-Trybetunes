import propTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const {
      previewUrl,
      trackName,
    } = this.props;
    return (
      <>
        <h1>{ trackName }</h1>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: propTypes.string.isRequired,
  trackName: propTypes.string.isRequired,
};

export default MusicCard;
