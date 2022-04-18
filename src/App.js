import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes.</p>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
