export const OAuthSettings = {
  //appId: '710df3e5-a1d5-4a45-a3f1-d65ac90eeb3a',
  appId: 'c3f741f0-eab4-419a-b76d-75050c2d5f64',
  redirectUri: window.location.origin,
  postLogoutUri: window.location.origin,
  domain_url: (window.location.origin.replace('https://', '').split('.')[0]) && (window.location.origin.replace('https://', '').split('.')[0] != 'healthinformation' && window.location.origin.replace('https://', '').split('.')[0] != 'yourmedchart') ? window.location.hostname.split('.')[1] : '',
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
  //appId: '710df3e5-a1d5-4a45-a3f1-d65ac90eeb3a',
  appId: 'c3f741f0-eab4-419a-b76d-75050c2d5f64',
  redirectUri: window.location.origin,
  postLogoutUri: window.location.origin,
  domain_url: (window.location.origin.replace('https://', '').split('.')[0]) && (window.location.origin.replace('https://', '').split('.')[0] != 'healthinformation' && window.location.origin.replace('https://', '').split('.')[0] != 'yourmedchart') ? window.location.hostname.split('.')[1] : '',
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
export const AppDomain =
{
  
}
