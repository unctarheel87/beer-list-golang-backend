import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CurrentDraftBeer from './currentDraftBeer';

const size = {
  position: "relative",
  width: "80%",
  padding: "15px",
  margin: "auto",
  background: "rgba(255, 255, 255, 0.9)",
  top: "20vh",
  borderRadius: "5px"
}

const background = {
  background: "url('/images/beertap.jpeg')",
  backgroundSize: "cover",
  height: "100vh",
  overflow: "auto"
}

const linkStyle = {
  position: "absolute",
  right: "15px",
  top: "10px",
  color: "whitesmoke"
}

export const BeerList = (props) => (
  <section style={ background }>
    <Link className="uk-flex uk-around" style={ linkStyle } to="/browse">
      <i className="material-icons uk-margin-small-right">table_chart</i>
      Admin Panel
    </Link>
    <div style={ size }>
      <h1 className="uk-text-center">Draft List</h1>
      <table className="uk-table uk-table-small uk-table-divider"> 
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
              <CurrentDraftBeer key={beer._id} {...beer}/>
            )) :
            <tr className="uk-text-center uk-margin-large-top"><td>Loading...</td></tr>
          }
        </tbody>
      </table>
    </div>
  </section>
)

const mapStateToProps = state => {
  return {
    beers: state.beers.filter(beer => beer.currentDraft)
  }
}

const mapBeerList = connect(mapStateToProps)(BeerList);

export default mapBeerList;
