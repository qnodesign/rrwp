import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import React, { PureComponent } from 'react';
import store from '../store/store';

/* main app container should have header footer generic */
import Container from './Container';

/* components */
import Test from './Test';
import ErrorRenderer from './ErrorRenderer';

class App extends PureComponent {
  constructor() {
    super();
    this.routes = [
      {
        path: '/Test/:target',
        component: Test,
      },
      {
        path: '/Test',
        component: Test,
        main: true,
      },
      {
        path: '/error',
        component: ErrorRenderer,
      },
    ];
  }

  addRoutes() {
    return this.routes.map(({ path, component }) => {
      return <Route key={path} path={path} component={component} />;
    });
  }

  render() {
    const customProps = {
      customprop: '',
    };

    const ContainerWithProps = withRouter(props => <Container {...customProps} {...props} />);
    const mainPath = this.routes.find(route => route.main).path;
    return (
      <Provider store={store}>
        <Router>
          <ContainerWithProps>
            <Switch>
              {this.addRoutes()}
              <Redirect exact from="/" to={mainPath} />
            </Switch>
          </ContainerWithProps>
        </Router>
      </Provider>
    );
  }
}

export default App;
