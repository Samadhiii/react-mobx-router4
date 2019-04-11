import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import RouteConfig from '../router/config';
import DevTools from 'mobx-react-devtools';

class App extends Component {
  componentDidMount() { }
  render() {
    return (
      <Provider {...this.props}>
        <RouteConfig />
      </Provider>
    );
  }
}
export default App;
