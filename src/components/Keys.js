import './Keys.css'
import React from "react"
import { evaluate } from 'mathjs'

class Key extends React.Component {
  render() {
    const keyType = this.props.symbol
    const keyClass = this.props.keyClass
    const handleKey = this.props.handleKey

    switch (keyType) {
      case "/":
        return <button onClick={() => handleKey(keyType)} className={keyClass}><i className="fa-solid fa-divide"></i></button>
      case "*":
        return <button onClick={() => handleKey(keyType)} className={keyClass}><i className="fa-solid fa-xmark"></i></button>
      case "-":
        return <button onClick={() => handleKey(keyType)} className={keyClass}><i className="fa-solid fa-minus"></i></button>
      case "+":
        return <button onClick={() => handleKey(keyType)} className={keyClass}><i className="fa-solid fa-plus"></i></button>
      case "DEL":
        return <button onClick={() => handleKey(keyType)} className={keyClass}><i className="fa-solid fa-delete-left"></i></button>
      case "<":
        return <button onClick={() => handleKey(keyType)} className={keyClass}><i className="fa-solid fa-angle-left"></i></button>
      default:
        return <button onClick={() => handleKey(keyType)} className={keyClass}>{keyType}</button>
    }
  }
}

export default class Keys extends React.Component {
  constructor(props) {
    super(props)
    this.numbers = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "="]
    this.operators = ["DEL", "/", "*", "-", "+"]
    this.handleKey = this.handleKey.bind(this)
    this.tryOperation = this.tryOperation.bind(this)
  }

  tryOperation(operation) {
    const appState = this.props.appState
    try { return evaluate(operation) } catch { return appState.result }
  }

  handleKey(key) {
    const operationSize = this.props.appState.operation.length
    const maxOperationSize = 12
    const appState = this.props.appState
    const setAppState = this.props.setAppState
    const tryOperation = this.tryOperation

    switch (key) {
      case "DEL":
        console.log(operationSize)
        if (operationSize > 0 && !appState.ac)  {
          setAppState({
            operation: appState.operation.slice(0, -1).toString(),
            result: tryOperation(appState.operation.slice(0, -1))
          })
        } else {
          setAppState({
            operation: "",
            result: ""
          })
        }
        break;
      case "=":
        setAppState({
          operation: tryOperation(appState.operation).toString(),
          result: "",
          ac: true
        })
        break;
      case "<":
        { /* Arrow menu soon.. */ }
        break;
      default:
        if (operationSize < maxOperationSize || !operationSize) {
          setAppState({
            operation: appState.operation + key,
            result: tryOperation(appState.operation + key),
            ac: false
          })
        }
    }
  }

  render() {
    const numbers = this.numbers
    const operators = this.operators

    return (
      <div className="Keys">
        <div className="Numbers">
          {numbers.map((number) =>
            <Key key={"KTR" + number} handleKey={this.handleKey} keyClass="numKey" symbol={number}></Key>
          )}
        </div>
        <div className="Operators">
          {operators.map((operator) =>
            <Key key={"KTR" + operator} handleKey={this.handleKey} keyClass="operatorKey" symbol={operator}></Key>
          )}
        </div>
        <div className="ArrowMenu">
          <Key key={"KTR<"} handleKey={this.handleKey} keyClass="arrowKey" symbol="<" />
        </div>
      </div>
    )
  }
}