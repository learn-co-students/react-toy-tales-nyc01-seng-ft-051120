import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy =>
        <ToyCard
          handleDelete={props.handleDelete}
          id={toy.id}
          name={toy.id}
          image={toy.image}
          likes={toy.likes}
        />
        )}
    </div>
  );
}

export default ToyContainer;
