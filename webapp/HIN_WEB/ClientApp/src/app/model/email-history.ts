export class EmailHistory {
  public EmailId: number;
  public EmailFrom: string;
  public EmailTo: string;
  public EmailSubject: string;
  public EmailTemplateId: number;
  public EmailBody: string;
  public CreatedOn: Date;
  public CreatedBy: string;
  public EmailCc: string;
}

export class EmailTemplate {
  public TemplateId: number;
  public TemplateName: string;
  public TemplateHtml: string;
  public TemplateJson: string;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
}

export class ComponentSettings {
  public fontSize: number;
  public backgroundColor: string;
  public textColor: string;
  public borderWidth: number;
  public borderColor: string;
  public borderStyle: string;
  public textAlign: string;
  public lineHeight: string;
  public marginTop: number;
  public marginRight: number;
  public marginBottom: number;
  public marginLeft: number;
  public paddingTop: number;
  public paddingRight: number;
  public paddingBottom: number;
  public paddingLeft: number;
  public title: string;
  public text: string;
  public navigation: string;
  public componentIndex: number;
}
