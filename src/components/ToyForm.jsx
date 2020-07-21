import React, { Component } from 'react';

const initalState = {
  name: '',
  image: '',
  likes: 0
}

class ToyForm extends Component {

  state = initalState

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    let{name, image, likes} = this.state
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name,
        image,
        likes: parseInt(likes)
      })
    })
    .then(resp => resp.json())
    .then(data => {
      this.setState(initalState)
      this.props.handleNewToy(data)
    })
  }

  render() {
    console.log(this.state);
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.handleSubmit}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text" onChange={this.handleChange} value={this.state.name}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" onChange={this.handleChange} value={this.state.image}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
