import React, { Component } from 'react';

const initialState={
  name: '',
  image: ''
}
class ToyForm extends Component {
  state=initialState

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  
  handleSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ 
        name: this.state.name,
        image: this.state.image,
        likes: 0
       })
    })
    .then(res=>res.json())
    .then(newToy => {
      this.props.addNewToy(newToy)
      console.log(newToy)
      this.setState(initialState)
    })
  }
  
  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" value={this.state.name} onChange={this.handleInputChange}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image} onChange={this.handleInputChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
