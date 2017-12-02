import React from 'react';
import { info } from 'qno-console';
import ErrorRenderer from './ErrorRenderer';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // Display fallback UI
    this.setState({ hasError: true });
    info(errorInfo);
    // You can also log the error to an error reporting service
    //logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorRenderer />;
    }
    return this.props.children;
  }
}
