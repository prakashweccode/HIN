export class Template {
  public Id: number;
  public PatientName: string;
  public AppointmentId: number;
  public Sex: string;
  public Age: string;
  public ChiefCompliant: string;
  public Date: Date;
  public DateOfAccident: Date;
  public HistoryOfIllness: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public CreatedOn: Date;
  public CreatedBy: string;
  public TemplateId: number;
  public DraftHtml: string;
  public Status: TemplateStatus;
}
export enum TemplateStatus {
  Draft = 0,
  Sent = 1
}

export class TemplateMailRequest {
  public MailId: string;
  public HtmlBody: string;
  public Appointment: string;
}

export class SearchOnedrive {
  public Location: string;
  public PracticeName: string;
  public PracticeDate: Date;
  public PatientName: string;
}
