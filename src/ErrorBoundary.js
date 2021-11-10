import React from "react";
import { captureException } from "@sentry/react";

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
        <div style={{ padding: "50px" }}>
          <h1>Něco se pokazilo.</h1>
          <p>
            Zkuste odstranit uložené obce z prohlížeče pomocí tlačítka níže. V
            případě přetrvávajících potíží mě prosím kontaktujte na e-mailu
            covid-obce@petrhovorka.com
          </p>
          <button
            id="delete-localstorage"
            onClick={() => this.deleteLocalStorage()}
          >
            Odstranit uložené obce
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
