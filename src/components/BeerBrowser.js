import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Beer from './Beer';
import AddBeer from './AddBeer';
import SortBeers from './SortBeers';
import selectBeers from '../selectors/sortBeers';

const size = {
  width: "90%",
  margin: "15px auto"
}

const linkStyle = {
  position: "absolute",
  right: "15px",
  top: "10px",
  color: "black"
}

const BeerBrowser = props => (
  <div style={ size }>
    <Link className="uk-flex uk-around" style={ linkStyle } to="/">
      <i className="material-icons uk-margin-small-right">format_list_bulleted</i>
      Draft List
    </Link>
    <h1 className="uk-text-center uk-margin-medium">Beer Database</h1>
    <AddBeer />
    <SortBeers />
    <table className="uk-table uk-table-divider">
      <thead>
        <tr>
          <th>Brewery Name</th>
          <th>Beer Name</th>
          <th>Beer Style</th>
          <th>ABV</th>
          <th>IBU</th>
        </tr>
      </thead>
      <tbody>
        { props.beers.length > 0 ?
          props.beers.map(beer => (
            <Beer key={beer._id} {...beer}/>
          )) :
          <tr className="uk-text-center uk-margin-large-top"><td>Loading...</td></tr>
        }
      </tbody>
    </table>
  </div>
);

const mapStateToProps = state => {
  return {
    beers: selectBeers(state.beers, state.filters)
  }
}

const mapBeerBrowser = connect(mapStateToProps)(BeerBrowser);

export default mapBeerBrowser;