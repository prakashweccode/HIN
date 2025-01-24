import { Contactinformation, Group } from "../contactinformation/contactinformation";

export class Batchemailsender {
  public TemplateId: number;
  public Contacts: Array<Contactinformation>;
  public ContentHtml: string;
  public Subject: string;
  public Groups: Array<Group>;
}
