import React, { Component } from 'react';

class ToyForm extends Component {
	state = {
		name: '',
		image: '',
	};

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		let { name, image } = this.state;
		e.preventDefault();
		fetch('http://localhost:3000/toys', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				name,
				image,
			}),
		})
			.then(resp => resp.json())
			.then(data => {
				this.setState({
					name: '',
					image: '',
				});
				this.props.handleNewToy(data);
			});
	};

	render() {
		return (
			<div className='container'>
				<form onSubmit={this.handleSubmit} className='add-toy-form'>
					<h3>Create a toy!</h3>
					<input
						onChange={this.handleChange}
						type='text'
						name='name'
						placeholder="Enter a toy's name..."
						className='input-text'
						value={this.state.name}
					/>
					<br />
					<input
						onChange={this.handleChange}
						type='text'
						name='image'
						placeholder="Enter a toy's image URL..."
						className='input-text'
						value={this.state.image}
					/>
					<br />
					<input
						type='submit'
						name='submit'
						value='Create New Toy'
						className='submit'
					/>
				</form>
			</div>
		);
	}
}

export default ToyForm;
