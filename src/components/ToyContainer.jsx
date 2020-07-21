import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy =><ToyCard key={toy.id} {...toy} deleteToy={props.deleteToy} increaseLikes={props.increaseLikes}/>)}
    </div>
  );
}

export default ToyContainer;
