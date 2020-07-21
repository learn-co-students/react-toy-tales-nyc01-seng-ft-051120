import React, { Component } from 'react';


const initialState = {
  name:"",
  image:"",
}

class ToyForm extends Component {
  state = initialState

  handleChange = (e)=>{
    this.setState({[e.target.name] : e.target.value})
  }

  handleSubmit = (e)=>{
    e.preventDefault()
    const {name,image} = this.state

    const serverData = {
      method:"POST",
      headers:{
        'Content-Type':"application/json",
        'Accept': "application/json"
      },
      body: JSON.stringify({name,image,likes:0})
    }

    fetch('http://localhost:3000/toys', serverData)
    .then(resp => resp.json())
    .then(toy =>{
      this.props.newToy(toy)
      this.setState(initialState)
    })
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={this.handleChange} type="text" name="name" value={this.state.name} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input  onChange={this.handleChange} type="text" name="image" value={this.state.image} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
