import './App.css';
import React from 'react';
import { evaluate } from 'mathjs'
import Display from './Display'
import Keys from './Keys'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      operation: "",
      result: ""
    }
    this.handleKey = this.handleKey.bind(this)
    this.tryOperation = this.tryOperation.bind(this)
  }

  tryOperation(operation) {
    try { return evaluate(operation) } catch { return this.state.result }
  }
  
  handleKey(key) {
    const maxOperationSize = 12
    switch (key) {
      case "DEL":
        this.setState({ operation: "", result: "" })
        break;
      case "=":
        this.setState((lastOperation) => ({
          operation: this.tryOperation(lastOperation.operation),
          result: ""
        }))
        break;
      case "<":
        { /* Arrow menu soon.. */ }
        break;
      default:
        const operationSize = this.state.operation.length
        if (operationSize < maxOperationSize || !operationSize) {
          this.setState((lastOperation) => ({
            operation: lastOperation.operation + key,
            result: this.tryOperation(lastOperation.operation + key)
          }))
        }
    }
  }

  render() {
    return (
      <div className="App">
        <Display appState={this.state} />
        <Keys handleKey={this.handleKey} />
      </div>
    )
  }
}

export default App;
