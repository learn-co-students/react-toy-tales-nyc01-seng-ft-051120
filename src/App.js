import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'

class App extends React.Component{

  state = {
    display: false,
    toys:[]
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  newToy = (toy)=>{ 
    this.setState( prevState => ({toys:[...prevState.toys,toy]}))
  }

  deleteToy = (id)=>{
    const newToyArray = this.state.toys.filter(toy=> toy.id !== id)
    this.setState({toys:newToyArray})
  }

  increaseLikes =(id,likes)=>{
    const serverData = {
      method:"PATCH",
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({likes:likes+1})
    }
    fetch(`http://localhost:3000/toys/${id}`,serverData)
    .then(resp=>resp.json())
    .then(updatedToy=> {
      const newToyArray = this.state.toys.map( toy=>{
        if (toy.id === updatedToy.id){
          return updatedToy
        }
        return toy
      })
    this.setState({toys:newToyArray})
    })

  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => this.setState({toys}) )
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm newToy={this.newToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} deleteToy={this.deleteToy} increaseLikes={this.increaseLikes}/>
      </>
    );
  }

}

export default App;
