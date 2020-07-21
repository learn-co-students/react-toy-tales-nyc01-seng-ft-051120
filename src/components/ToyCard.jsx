import React, { Component } from 'react';

class ToyCard extends Component {
  
  handleDeleteBtn = (id)=>{
    const serverData = {
      method:"DELETE",
      headers:{
        'Content-Type':"application/json",
        'Accept': "application/json"
      }
    }

    fetch(`http://localhost:3000/toys/${id}`, serverData)
    .then(resp => resp.json())
    .then(toy =>{
      this.props.deleteToy(id)
    })

   
  }


  render() {
    const {id,name,image,likes} = this.props
    return (
      <div className="card">
        <h2>{/* Toy's Name */name}</h2>
        <img src={image /* Toy's Image */} alt={name/* Toy's Name */} className="toy-avatar" />
        <p>{likes /* Toy's Likes */} Likes </p>
        <button className="like-btn" onClick={()=>{this.props.increaseLikes(id,likes)}}>Like {'<3'}</button>
        <button className="del-btn" onClick={()=>{this.handleDeleteBtn(id)}}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
