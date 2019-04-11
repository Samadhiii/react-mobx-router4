import React, { Component } from 'react';
import { Route } from 'react-router-dom';

export default class RouteWithSubRoutes extends Component {
  componentDidMount() { }
  render() {
    const route = this.props;
    return (
      <Route
        path={route.path}
        render={props => (
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }
}
