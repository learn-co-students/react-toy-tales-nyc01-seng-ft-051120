import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  const {toys} = props
  return(
    <div id="toy-collection">
      {toys.map(toy => <ToyCard key={toy.id} {...toy} addLike={props.addLike} removeToy={props.removeToy}/>)}
    </div>
  );
}

export default ToyContainer;
