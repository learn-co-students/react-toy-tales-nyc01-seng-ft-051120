import React, { Component } from 'react';

class ToyForm extends Component {
  state = {
    name: '',
    image: '',
    likes: 0
  }

  handleChange = e => {
    this.setState( { [e.target.name]: e.target.value} )
  }

  handleSubmit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(newToy => {
      this.props.handleNewToy(newToy)
      this.setState({name: '', image: '', likes: 0})
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" onChange={this.handleChange} name="name" value={this.state.name} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" onChange={this.handleChange} name="image" value={this.state.image} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
