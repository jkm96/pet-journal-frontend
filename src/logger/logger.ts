import pino from 'pino'
import { logflarePinoVercel } from 'pino-logflare'

const { stream, send } = logflarePinoVercel({
    apiKey: "ylhOwHUV8soG",
    sourceToken: "a7b5a798-3015-4883-ac08-f599cc7226ea"
});

// create pino logger
const logger = pino({
    browser: {
        transmit: {
            level: "info",
            send: send,
        }
    },
    level: "debug",
    base: {
        env: process.env.NODE_ENV,
        revision: process.env.VERCEL_GITHUB_COMMIT_SHA,
    },
}, stream);

export default logger