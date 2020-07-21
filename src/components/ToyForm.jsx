import React, { Component } from 'react';

class ToyForm extends Component {
state = {
 name: "",
 image: ""
}

updateName = (e) => {
 this.setState({name: e.target.value})
}

updateImage = (e) => {
 this.setState({image: e.target.value})
}

  render() {
    return (
      <div className="container">
        <form onSubmit={(e)=> this.props.postToy(e, this.state)}className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={this.updateName} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.updateImage} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
