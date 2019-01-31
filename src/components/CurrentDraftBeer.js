import React from 'react';

export default ({
  "Brewery Name": brewery_name, 
  "Beer Name": beer_name, 
  "Beer Style": beer_style, 
  ABV, 
  IBU
}) => (
    <tr>
      <td>{brewery_name}</td>
      <td>{beer_name}</td>
      <td>{beer_style}</td>
      <td>{ABV}</td>
      <td>{IBU}</td>
    </tr>
);