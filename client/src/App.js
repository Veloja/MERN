import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = { users: [] }

  componentDidMount() {
    fetch('http://localhost:3001/users')
    .then(res => res.json())
    .then(users => this.setState({ users }))
  }

  render() {
    return (
      <div className="App">
        <ul>
          {
            this.state.users.map(user => <li>asdas</li>)
          }
        </ul>
      </div>
    );
  }
}

export default App;
