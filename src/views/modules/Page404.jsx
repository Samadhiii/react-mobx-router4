import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class NotFound extends Component {
  componentDidMount() { }
  render() {
    return (
      <div>
        <li><Link to="/login">login</Link></li>
        <h1>This is 404Page</h1>
      </div>
    );
  }
}

