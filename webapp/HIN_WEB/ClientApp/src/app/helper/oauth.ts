export const OAuthSettings = {
  appId: 'c3f741f0-eab4-419a-b76d-75050c2d5f64',
  redirectUri: 'https://localhost:44353',
  //redirectUri: 'https://' + ((window.location.host.split('.')[1] ? window.location.host.split('.')[0] : '') == 'network' ? '' : (window.location.host.split('.')[1] ? (window.location.host.split('.')[0] + '.') : '')) + 'network',
  authority:'https://login.microsoftonline.com/d5012b81-b915-4802-a60b-8c494578cbd4/',
  scopes: [
    "User.ReadWrite.All",
    "Mail.ReadWrite",
    "Mail.Send",
    "Directory.ReadWrite.All",
    "Calendars.ReadWrite",
    "Files.ReadWrite.All",
    "Sites.ReadWrite.All"
  ]
};
export const OneDriveSettings = {
  appId: 'c3f741f0-eab4-419a-b76d-75050c2d5f64',
  //redirectUri: 'https://' + ((window.location.host.split('.')[1] ? window.location.host.split('.')[0] : '') == 'network' ? '' : (window.location.host.split('.')[1] ? (window.location.host.split('.')[0] + '.') : '')) + 'network',
  redirectUri: 'https://localhost:44353',
  authority: 'https://login.microsoftonline.com/d5012b81-b915-4802-a60b-8c494578cbd4/',
  scopes: [
    "User.ReadWrite.All",
    "Mail.ReadWrite",
    "Mail.Send",
    "Directory.ReadWrite.All",
    "Calendars.ReadWrite",
    "Files.ReadWrite.All",
    "Sites.ReadWrite.All"
  ]
};
