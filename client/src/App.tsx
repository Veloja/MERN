import React from 'react';
import './App.css';

interface AppState {
  count: number;
}

class App extends React.Component<{}, AppState> {

  public state: AppState = {
    count: 0,
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            sadasdas
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
