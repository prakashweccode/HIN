export const environment = {
  production: true,
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
