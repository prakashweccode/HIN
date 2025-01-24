// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  msalConfig: {
      auth: {
      clientId: 'b8b2a6f4-8d8b-486c-8953-2c66b6913c83',
      authority: 'https://login.microsoftonline.com/d5012b81-b915-4802-a60b-8c494578cbd4'
      }
  },
  apiConfig: {
      scopes: ['User.Read', 'User.ReadWrite.All', 'Mail.Send', 'Directory.ReadWrite.All', 'Calendars.ReadWrite', 'Files.ReadWrite.All'],
      uri: 'https://graph.microsoft.com/v1.0/me'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
