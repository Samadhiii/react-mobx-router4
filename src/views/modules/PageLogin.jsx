import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { Link } from 'react-router-dom';

@inject('store')
export default class Login extends Component {
  componentDidMount() { }
  render() {
    console.log(this.props);
    return (
      <div>
        <li><Link to="/page404">page404</Link></li>
        <h1>login</h1>
      </div>
    );
  }
}
