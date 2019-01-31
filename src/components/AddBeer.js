import React, { Component } from 'react';
import API from '../utils/API';
import { add_Beer, updateMsg } from '../actions';
import { connect } from 'react-redux';

export class AddBeer extends Component {
  state = {
    brewery_name: '',
    beer_name: '',
    beer_style: '',
    ABV: '',
    IBU: ''
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const newBeer = {
      "Brewery Name": this.state.brewery_name,
      "Beer Name": this.state.beer_name,
      "Beer Style": this.state.beer_style,
      ABV: this.state.ABV,
      IBU: this.state.IBU
    }
    API.addBeer(newBeer)
      .then(response => {
        this.props.addBeer(response.data)
        this.props.updateMsg('New beer successfully added!')
      }).catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>
        <form className="uk-flex" onSubmit={this.handleSubmit}>
          <input className="uk-input" type="text" placeholder="Brewery Name" value={this.state.brewery_name} onChange={this.handleChange('brewery_name')} />
          <input className="uk-input" type="text" placeholder="Beer Name"  value={this.state.beer_name} onChange={this.handleChange('beer_name')} />
          <input className="uk-input" type="text" placeholder="Beer Style" value={this.state.beer_style} onChange={this.handleChange('beer_style')} />
          <input className="uk-input" type="text" placeholder="ABV" value={this.state.ABV} onChange={this.handleChange('ABV')} />
          <input className="uk-input" type="text" placeholder="IBU" value={this.state.IBU} onChange={this.handleChange('IBU')} />
          <button className="uk-button uk-button-primary" type="submit">Add</button>
        </form>
        <p>{this.props.msg}</p>
      </div>
    )   
  }
}

const mapStateToProps = state => {
  return {
    msg: state.msg
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addBeer: beer => dispatch(add_Beer(beer)),
    updateMsg: msg => dispatch(updateMsg(msg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBeer);