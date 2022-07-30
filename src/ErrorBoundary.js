import React from "react";
import { captureException } from "@sentry/react";
import { Alert, AlertTitle } from "@mui/material";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  deleteLocalStorage = () => {
    localStorage.removeItem("obce");
    localStorage.removeItem("municipalities");
    window.location.reload();
  };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("error: ", error, errorInfo);
    window.gtag("event", "exception", {
      error: error,
      stack: errorInfo.componentStack,
    });
    captureException(error, { extra: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Alert severity="error">
          <AlertTitle>Něco se pokazilo</AlertTitle>
          Zkuste to prosím znovu později. V případě přetrvávajících potíží mě
          prosím kontaktujte na e-mailu covid-obce@petrhovorka.com.
        </Alert>
      );
    }

    return this.props.children;
  }
}
