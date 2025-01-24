import { Networkingcost } from "./networkingcost";
import { Time } from "@angular/common";

export class Networking {
  public NetworkingId: number;
  public NetworkingName: string;
  public NetworkingNumber: string;
  public Address: string;
  public City: string;
  public State: string;
  public Zipcode: string;
  public Website: string;
  public Telephone: string;
  public Fax: string;
  public Country: string;
  public Industry: string;
  public CostId: number;
  public EventMeetId: number;
  public Inactive: boolean;
  public Cost: Networkingcost;
  public EventMeet: NetworkingEventMeet;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
export class NetworkingEventMeet {
  public Id: number;
  public YearlyDate: Date;
  public MonthlyDate: Date;
  public WeeklyDate: Date;
  public YearlyTime: Time;
  public MonthlyTime: Time;
  public WeeklyTime: Time;
  public Notes: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
