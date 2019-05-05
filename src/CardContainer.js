import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import '../src/Card.css';
import Card from './Card';

export default class CardContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { startX, endX}
    return (
      <Motion style={{ startX: spring(this.props.deal ? endX : 0) }}>
        {({ startX }) => (
          <div
            style={{
              WebkitTransform: `translate3d(${startX}px, 200px, 0)`,
              transform: `translate3d(${startX}px, 200px, 0)`,
              width: `150px`,
              height: `200px`,
              zIndex: `3`,
              position: 'absolute'
            }}
          >
            <Card
              size={200}
              card={this.props.card}
              faceDown={true}
              doubleBacked={false}
              rotationY={this.state.rotationY}
            />
          </div>
        )}
      </Motion>
    );
  }
}
