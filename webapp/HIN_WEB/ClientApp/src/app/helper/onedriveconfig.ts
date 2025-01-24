export const Onedriveconfig = {
  appId: 'c3f741f0-eab4-419a-b76d-75050c2d5f64',
  scope: 'User.Read User.ReadWrite.All Mail.Send Directory.ReadWrite.All Calendars.ReadWrite Files.ReadWrite.All',
  graphAuthUrl: 'https://login.microsoftonline.com/d5012b81-b915-4802-a60b-8c494578cbd4/oauth2/v2.0/authorize',
  graphV1UrlExcludeMe:'https://graph.microsoft.com/v1.0/',
  graphV1Url: 'https://graph.microsoft.com/v1.0/me/',
  graphBetaUrl: 'https://graph.microsoft.com/beta/me/',
  Language: 'en-US'
};

export const explorerValues: any = {
  selectedOption: 'GET',
  selectedVersion: 'v1.0',
  authentication: {
    user: {}
  },
  showImage: false,
  requestInProgress: false,
  headers: [],
  postBody: ''
};
