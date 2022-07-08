import './App.css';
import React from 'react';
import Display from './Display'
import Keys from './Keys'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      operation: "",
      result: "",
      ac: false
    }
  }

  render() {
    return (
      <div className="App">
        <Display appState={this.state} />
        <Keys handleKey={this.handleKey} appState={this.state} setAppState={(props) => this.setState({...props})} />
      </div>
    )
  }
}

export default App;
