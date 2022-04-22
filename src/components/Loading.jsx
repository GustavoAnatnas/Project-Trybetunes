import React from 'react';

class Loading extends React.Component {
  render() {
    return (
      <div className="load">
        <h1 data-testid="page-loading">Carregando...</h1>
      </div>
    );
  }
}

export default Loading;
