import React from "react";

const BeersList = (props) => {
  return (
    <ul className="List">
      {props.beers.map((beer) => (
        <li key={beer.id} className="List-item">
          <figure className="List-item-img">
            <img alt="beer" src={beer.image_url} />
          </figure>
          <div className="List-item-info">
            <p>{beer.name}</p>
            <ul>
              <li>
                <small>ABV: {beer.abv}</small>
              </li>
              <li>
                <small>
                  Volume: {beer.volume.unit} {beer.volume.unit}
                </small>
              </li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BeersList
