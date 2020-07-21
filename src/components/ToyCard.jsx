import React, { Component } from 'react';

class ToyCard extends Component {
  state={
    likes: this.props.likes
  }

  // componentDidUpdate(prevProps){
  //   if(prevProps.id != this.props.id){
  //     this.setState({likes: this.props.likes})
  //   }
  // }

  clickLike = () => {
    let likes = parseInt(this.state.likes) + 1
    fetch(`http://localhost:3000/toys/${this.props.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ likes })
    })
    .then(res=>res.json())
    .then(likesData => {
      this.props.addLike(likesData)
      console.log(likesData)
      this.setState(prevState => {
        return {likes: prevState.likes + 1}
      })
    })
  }

  donateToy = () => {
    fetch(`http://localhost:3000/toys/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      }
    })
    .then(data => this.props.removeToy(this.props.id))
  }

 
  
  render() {
    const {name, image, likes, id} = this.props
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button className="like-btn" onClick={this.clickLike}>Like {'<3'}</button>
        <button className="del-btn" onClick={this.donateToy}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
