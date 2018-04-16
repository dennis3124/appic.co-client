// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.


// Environment auth and core juggles between port 8090 (Auth) and 8091 (Core)
export let environment = {
  production: false,
  auth: false,
  core: false,
  upload: false,
  skip: 0,
  limit: 0,
  useSessionStorage: false,
};

export const authorizedEndpoints = [
  '/companies',
  '/posts'
];


export const api = {
  endpoints: {
    users: '/users',
    auth: '/auth',
    posts: '/posts',
    companies: '/companies'
  },
  baseUrls: {
    localAuth: '//localhost:8090/api',
    localCore: '//localhost:8091/api'
  }
};

