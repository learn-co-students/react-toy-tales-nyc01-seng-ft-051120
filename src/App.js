import React from 'react';
import './App.css';

import Header from './components/Header';
import ToyForm from './components/ToyForm';
import ToyContainer from './components/ToyContainer';

import data from './data';

class App extends React.Component {
	state = {
		display: false,
		toys: [],
	};

	handleClick = () => {
		let newBoolean = !this.state.display;
		this.setState({
			display: newBoolean,
		});
	};

	componentDidMount() {
		fetch('http://localhost:3000/toys')
			.then(resp => resp.json())
			.then(resp => this.setState({ toys: resp }));
	}

	handleNewToy = data => {
		this.setState({ toys: [...this.state.toys, data] });
	};

  handleDelete = id => {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        let newToys = this.state.toys.filter(toys=>toys.id !== id)
      this.setState({toys:newToys})
      }
      
      )
}
	render() {
		console.log(this.state.toys);
		return (
			<>
				<Header />
				{this.state.display ? (
					<ToyForm handleNewToy={this.handleNewToy} />
				) : null}
				<div className='buttonContainer'>
					<button onClick={this.handleClick}> Add a Toy </button>
				</div>
        <ToyContainer
          handleDelete={this.handleDelete}
          toys={this.state.toys} />
			</>
		);
	}
}

export default App;
