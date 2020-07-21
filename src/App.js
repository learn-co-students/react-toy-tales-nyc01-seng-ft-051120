import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => this.setState({toys: toys}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleNewToy = (newToy) => {
    this.setState({
      toys: [...this.state.toys, newToy]
    })
  }

  deleteToy = (id) => {
    console.log(id)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(() => {
      let newToys = this.state.toys.filter(toy => toy.id !== id)
      this.setState({
        toys: newToys
      })
    })
  }

  handleLikes = (id, likes) => {
    console.log(id, likes)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
          likes: likes + 1
      })
    })
    .then(resp => resp.json())
    .then(updatedToy => {
              let updatedToyArr = this.state.toys.map(toy => {
                if(toy.id === updatedToy.id){
                  return {...toy, likes: updatedToy.likes}
                }
                return toy
              })
              this.setState({toys: updatedToyArr})
    })
  }

  render(){
    console.log(this.state);
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleNewToy={this.handleNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} handleLikes={this.handleLikes}/>
      </>
    );
  }

}

export default App;
