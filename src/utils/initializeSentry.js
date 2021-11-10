import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

export const initializeSentry = () => {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    release: `${process.env.REACT_APP_NAME}@${process.env.REACT_APP_VERSION}`,
    environment: process.env.REACT_APP_ENV,
    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
};
