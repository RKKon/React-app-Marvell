import { Component } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false
  }

  // static getDerivedStateFromError(error) { // how setState but works with Error. componentDidCatch may be better 
  //   return {error: true};
  // }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({error: true})
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage></ErrorMessage>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;