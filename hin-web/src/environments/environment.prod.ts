export const environment = {
	production: true,
	msalConfig: {
		auth: {
			clientId: 'c3f741f0-eab4-419a-b76d-75050c2d5f64',
			authority: 'https://login.microsoftonline.com/d5012b81-b915-4802-a60b-8c494578cbd4/oauth2/v2.0/authorize'
		}
	},
	apiConfig: {
		scopes: ['User.Read', 'User.ReadWrite.All', 'Mail.Send', 'Directory.ReadWrite.All', 'Calendars.ReadWrite', 'Files.ReadWrite.All'],
		uri: 'https://graph.microsoft.com/v1.0/me'
	}
};