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
    this.fetchToys()
  }

  fetchToys = () => {
    fetch(' http://localhost:3000/toys')
    .then(res=>res.json())
    .then(toyData => this.setState({toys: toyData}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  addLike = (toyData) => {
    let newToys = this.state.toys.map(toy => {
      if (toy.id === toyData.id) {
        return {...toy, likes: toyData.likes}
      } 
        return toy
    })
    // this.setState({toys: newToys})
    this.setState({ toys: newToys}, ()=>console.log(this.state.toys))
  }
  addNewToy = (newToy) => {
    this.setState({ toys: [...this.state.toys, newToy]}, ()=>console.log(this.state.toys))
  }

  removeToy = (id) => {
    let newToys = this.state.toys.filter(toy => toy.id != id)
    this.setState({toys: newToys}, ()=>console.log(this.state.toys))
  }


  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm addNewToy={this.addNewToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys}  addLike={this.addLike} removeToy={this.removeToy}/>
      </>
    );
  }

}

export default App;
