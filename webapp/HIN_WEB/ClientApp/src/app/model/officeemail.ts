
export class Officeemail {
  public message: Message;
  public saveToSentItems: string;
}
export class Message {
  public subject: string;
  public body: Body;
  public toRecipients: Torecipient[];
  public ccRecipients: Ccrecipient[];
}
export class Body {
  public contentType: string;
  public content: string;
}
export class Torecipient {
  public emailAddress: Emailaddress;
}
export class Emailaddress {
  public address: string;
}
export class Ccrecipient {
  public emailAddress: Emailaddress1;
}
export class Emailaddress1 {
  public address: string;
}

export class MailFolder {
  public id: string;
  public displayName: string;
  public parentFolderId: string;
  public childFolderCount: number;
  public unreadItemCount: number;
  public totalItemCount: number;
}
