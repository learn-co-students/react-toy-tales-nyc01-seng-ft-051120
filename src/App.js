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

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
      this.setState({toys: data})
    })
  }

  handleNewToy = (newToy) => {
    this.state( {toys: [...this.state.toys, newToy]} )
  }

  deleteToy = toyId => {
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(res => res.json())
    .then(() => {
      let newToys = this.state.toys.filter(toy => toy.id !== toyId)
      this.setState({toys: newToys})
    })
  }

  likeToy = (toyId, toyLikes) => {
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, 
      body: JSON.stringify( {
        likes: toyLikes + 1
      } )
    })
    .then(res => res.json())
    .then(updatedToy => {
      let newToyArray = this.state.toys.map(toy => {
        if (toy.id === toyId) {
          return updatedToy
        }
        return toy
      }
      )
      this.setState({toys: newToyArray})
    })

  }

  render(){
    console.log(this.state)
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
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} likeToy={this.likeToy}/>
      </>
    );
  }

}

export default App;