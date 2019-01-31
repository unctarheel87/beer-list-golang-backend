import React from 'react';
import API from '../utils/API';
import { connect } from 'react-redux';
import { remove_Beer, update_Beer, updateMsg } from '../actions';

const updateBeer = (id, currentDraft, dispatch) => () => {
  currentDraft = currentDraft ? false : true;
  API.updateBeer(id, { currentDraft })
    .then(response => {
      dispatch(update_Beer(id, { currentDraft }));
    }).catch(err => {
      console.log(err);
    })
}

const removeBeer = (id, dispatch) => () => {
  API.removeBeer(id)
    .then(response => {
      dispatch(remove_Beer(id));
      dispatch(updateMsg(`Beer ID ${id} successfully deleted.`));
    }).catch(err => {
      console.log(err);
    })
}

const green = {
  background: '#DCEDC8'
}

const Beer = ({
  dispatch, 
  "Brewery Name": brewery_name, 
  "Beer Name": beer_name, 
  "Beer Style": beer_style, 
  ABV, 
  IBU,
  currentDraft,
  _id, 
}) => (
    <tr style={currentDraft ? green : null}>
      <td>{brewery_name}</td>
      <td>{beer_name}</td>
      <td>{beer_style}</td>
      <td>{ABV}</td>
      <td>{IBU}</td>
      <td><i 
        className="material-icons" 
        onClick={removeBeer(_id, dispatch)}
        >remove_circle</i></td>
      <td><i 
        className="material-icons"
        onClick={updateBeer(_id, currentDraft, dispatch)}
        >check_circle</i></td>
    </tr>
);

export default connect()(Beer);
