import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  console.log(props);
  return(
    <div id="toy-collection">
      {props.toys.map(toy => 
        <ToyCard
        key={toy.id}
        id={toy.id}
        name={toy.name}
        img={toy.image}
        likes={toy.likes}
        deleteToy={props.deleteToy}
        handleLikes={props.handleLikes}
        />
      )}
    </div>
  );
}

export default ToyContainer;
