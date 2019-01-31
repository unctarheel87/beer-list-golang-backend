import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import BeerList from './components/BeerList';
import BeerBrowser from './components/BeerBrowser';
import { setBeers } from './actions';
import { connect } from 'react-redux'
import API from './utils/API';

class App extends Component {
  componentDidMount() {
    this.getBeerList();
  }
  getBeerList = () => {
    API.getBeerList()
      .then(response => {
        this.props.getBeers(response.data);
      }).catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={BeerList} />
          <Route path='/browse' component={BeerBrowser} />
        </Switch>
      </BrowserRouter>
    )
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getBeers: beers => dispatch(setBeers(beers))
  }
}

const mapApp = connect(
  null,
  mapDispatchToProps
)(App);

export default mapApp;