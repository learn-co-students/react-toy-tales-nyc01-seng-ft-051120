import React, { Component } from 'react';

class ToyCard extends Component {

  render() {

    const {name, image, likes} = this.props.toy
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button onClick={()=> this.props.patch(this.props.toy)}className="like-btn">Like {'<3'}</button>
        <button onClick={()=> this.props.delete(this.props.toy.id)}className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
