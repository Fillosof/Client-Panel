// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDwYH9wsfSouH05ssOK3QZsQpU_y4V3tKQ',
    authDomain: 'client-panel-prod-e1f13.firebaseapp.com',
    databaseURL: 'https://client-panel-prod-e1f13.firebaseio.com',
    projectId: 'client-panel-prod-e1f13',
    storageBucket: 'client-panel-prod-e1f13.appspot.com',
    messagingSenderId: '700120207912'
  }
};

