import './Display.css';
import React from 'react';

export default class Display extends React.Component {
  render() {
    const {operation, result} = this.props.appState
    
    return (
      <div className="Display">
        <h1 className="typedOperation">{operation}</h1>
        <h2 className="resultPreview">{result}</h2>
      </div>
    )
  }
}