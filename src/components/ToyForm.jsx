import React, { Component } from 'react';

const initialState = {
  name: '',
  image: ''
}
class ToyForm extends Component {
  state=initialState

  handleChange=(e)=>{
    this.setState({ [e.target.name] : e.target.value })
  }

  handleSubmit=(e)=>{
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"},
        body: JSON.stringify(
          {name: this.state.name,
          image: this.state.image,
          likes: 0})
        })
        .then(resp=>resp.json())
        .then(newToy => {
          this.setState(initialState)
          this.props.handleNewToy(newToy)
    })
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form">
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." 
            className="input-text" onChange={this.handleChange}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..."
            className="input-text" onChange={this.handleChange}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" 
            className="submit" onClick={this.handleSubmit}/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
