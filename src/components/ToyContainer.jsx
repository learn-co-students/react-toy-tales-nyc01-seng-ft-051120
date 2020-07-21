import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {
    state = {
      toys: this.props.toys
    }

    patchToy = e => {

      fetch(`http://localhost:3000/toys/${e.id}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json'
      },
      body: JSON.stringify({
          likes: e.likes + 1
       })
     })
      this.props.fetch()
    }

    deleteToy = e => {

      fetch(`http://localhost:3000/toys/${e}`, {
      method: 'DELETE',
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
      this.props.fetch()
    }

  render(){
  return(
    <div id="toy-collection">
      {this.props.toys.map((toy, index) =>
         <ToyCard key={toy.id} toy={toy} delete={this.deleteToy} patch={this.patchToy}/>
      )}
    </div>
  );
 }
}

export default ToyContainer;
