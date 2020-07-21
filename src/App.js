import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  componentDidMount(){
      this.fetchToys()
  }

  fetchToys = () => {
    fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => {
        this.setState({ toys: data})
    })
  }
  postToy(e) {
    fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       Accept: 'application/json'
    },
    body: JSON.stringify({
        name: e.name,
        image: e.image,
        likes: 0
     })
   })

  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  render(){
    console.log(this.state)
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm postToy={this.postToy}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toys={this.state.toys} fetch={this.fetchToys}/>
      </>
    );
  }

}

export default App;
