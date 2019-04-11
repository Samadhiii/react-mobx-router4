import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RouteWithSubRoutes from '../../router/util';

export default class Login extends Component {
  componentDidMount() { }
  render() {
    const { routes } = this.props;
    return (
      <div>
        <ul>
          <li><Link to="/test/todo">todo</Link></li>
          <li><Link to="/test/about">about</Link></li>
        </ul>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </div>
    );
  }
}
