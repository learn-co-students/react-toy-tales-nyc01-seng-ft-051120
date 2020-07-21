import React from 'react';
import './App.css';
import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import data from './data'

class App extends React.Component{
  state = {
    toys:[],
    addToy:{},
    display: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp=>resp.json())
    .then(toys=>this.setState({toys}))
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({ display: newBoolean})
  }

  handleNewToy = (newToy) => {
    this.setState({ toys: [...this.state.toys, newToy] })
  }

  removeToy = (toyId) => {
    fetch(`http://localhost:3000/toys/${toyId}`,{
      method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'}
    })
    .then(resp=>resp.json())
    .then(()=>{
      let newToyCollection = this.state.toys.filter(toy => toy.id !== toyId)
      this.setState({toys: newToyCollection})
    })
  }

  handleLike = (toyId, likes) => {
    fetch(`http://localhost:3000/toys/${toyId}`,{
      method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'},
          body: JSON.stringify({ 
            likes: likes + 1
        })
    })
    .then(resp=>resp.json())
    .then(updatedToy=> {
      let updatedToysArr = this.state.toys.map( toy => {
        if (toy.id === updatedToy.id){
            return {...toy, likes: updatedToy.likes}
        }
        return toy
    })
    this.setState({ toys: updatedToysArr })
  })
}

  render(){
    return (
      <>
        <Header/>
        { this.state.display ?
         <ToyForm 
         handleNewToy={this.handleNewToy}/> : null}
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} removeToy={this.removeToy} handleLike={this.handleLike}/>
      </>
    );
  }
}
export default App;
