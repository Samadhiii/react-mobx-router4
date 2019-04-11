import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import routes from './router';
import RouteWithSubRoutes from './util';

const environment = process.env.NODE_ENV;

export default class RouteConfig extends Component {
  componentDidMount() { }
  render() {
    return (
      <div>
        <Router>
          <div>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </div>
        </Router>
        {environment === 'development' && <DevTools />}
      </div>
    );
  }
}
