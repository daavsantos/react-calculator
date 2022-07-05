import './Display.css';
import React from 'react';

export default class Display extends React.Component {
  render() {
    return (
      <div className="Display">
        <h1 className="typedOperation">{this.props.operationState.operation}</h1>
        <h2 className="resultPreview">{this.props.operationState.result}</h2>
      </div>
    )
  }
}