import { LabelType } from "./label-type";

export class Organization {
  public Id: number;
  public LeadId: number;
  public Name: string;
  public LabelId: number;
  public Address: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public City: string;
  public Country: string;
  public State: string;
  public ZipCode: string;
  public Website: string;
  public Label: LabelType;
}
