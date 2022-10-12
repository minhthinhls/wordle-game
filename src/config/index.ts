const isProduction = import.meta.env.PROD;
const isDevelopment = !isProduction;

const SERVER_ENDPOINT = `https://wordle.votee.dev:8000`;
const API_ENDPOINT = `${SERVER_ENDPOINT}`;

const CONFIG = {
    isProduction: isProduction,
    isDevelopment: isDevelopment,
    serverHost: SERVER_ENDPOINT,
    /** - Routing basename !*/
    baseURL: '/',
    /** - Page title !*/
    title: 'WORD-LIKE PUZZLE',
    http: {
        baseURL: API_ENDPOINT,
    },
    socket: {
        baseURL: SERVER_ENDPOINT,
    },
    github: {
        clientId: isProduction ? '789d87c19dd5ed1dc42e' : '489b39e1f91d934128c8',
        /** - Do not change callbackURL at will, otherwise it needs to be modified together with the server configuration file !*/
        callbackURL: `${isProduction ? 'https://work-api.github.com' : window.location.origin}/api/passport/github/callback`,
        repositoryUrl: "https://github.com/eggjs/egg",
        bug: "https://www.npmjs.com/package/egg"
    }
};

export default CONFIG;
