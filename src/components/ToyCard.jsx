import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.name}</h2>
        <img src={this.props.img} alt={this.props.name} className="toy-avatar" />
        <p>{this.props.likes} Likes </p>
        <button className="like-btn" onClick={() => this.props.handleLikes(this.props.id, this.props.likes)}>Like {'<3'}</button>
        <button className="del-btn" onClick={e => this.props.deleteToy(this.props.id)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
