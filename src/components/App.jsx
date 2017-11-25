import { provider, Provider } from 'react-redux';
import styles from './App.less';
import polyfill from '../polyfill/polyfill';
import { HashRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
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
        path: '/Test',
        component: Test,
      },
      {
        path: '/Test/:param',
        component: Test,
      },
      {
        path: '/error',
        component: ErrorRenderer,
      },
    ];
  }

  addRoutes() {
    return this.routes.map(({ path, component }) => {
      <Route key={path} path={path} component={component} />;
    });
  }

  render() {
    const customProps = {
      customprop: 'customprop',
    };
    const ContainerWithProps = withRouter(props => <Container {...customProps} {...props} />);

    return (
      <Provider store={store}>
        <Router>
          <div className={styles.main}>
            <ContainerWithProps>
              <Switch>{this.addRoutes()}</Switch>
            </ContainerWithProps>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
