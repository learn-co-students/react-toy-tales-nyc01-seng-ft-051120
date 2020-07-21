import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

import data from './data'


class App extends React.Component{

  state = {
    display: false,
    toys: [],
    name: '',
    image: ''

  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      this.setState({ toys })
    })
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleForm = (e) => {
    this.setState({
    [e.target.name]: e.target.value
    })
  }

  submitHandler = (e) =>{
    e.preventDefault();
    const{name, image} = this.state
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify({
        name,
        image
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({toys: [...this.state.toys, data ]})
    })
    this.setState({
      name: '',
      image: ''
    })
  }

  deleteHandler = (id) => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then(() => {
      let newToys = this.state.toys.filter(toy => toy.id !== id)
      this.setState({
        toys: newToys
      })
    })
  }

  handleLikes = (id) => {
    let selectedToy = this.state.toys.find(toy => toy.id === id)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accepts": "application/json"
      },
      body: JSON.stringify({
        likes: selectedToy.likes += 1
      })
    })
    .then(res => res.json())
    .then(data => {
      let newToys = this.state.toys.map( toy => {
        if(toy.id === data.id){
          return {...toy, likes: data.likes}
        }
        return toy
      })
      this.setState({
        toys: newToys
      })
    })
  }

  render(){
    console.log(this.state.toys)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm
          submitHandler={this.submitHandler}
          handleForm={this.handleForm}
          name={this.state.name}
          image={this.state.image}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> {this.state.display ? "Hide Form" : "Add a Toy"} </button>
        </div>
        <ToyContainer
        toys={this.state.toys}
        delete={this.deleteHandler}
        handleLikes={this.handleLikes}/>
      </>
    );
  }

}

export default App;
