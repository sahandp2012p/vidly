import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

function init() {
	Sentry.init({
		dsn: 'https://81c7b672d1bf4bd6ab3ee3316c382529@o1167906.ingest.sentry.io/6259355',
		integrations: [ new BrowserTracing() ],
		tracesSampleRate: 1.0
	});
}

function log(error) {
	Sentry.captureException(error);
}

export default { init, log };
