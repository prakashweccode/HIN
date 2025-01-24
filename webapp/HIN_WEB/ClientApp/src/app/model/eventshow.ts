export class Eventshow {
  public Id: number;
  public Address: string;
  public City: string;
  public Country: string;
  public State: string;
  public ZipCode: string;
  public Website: string;
  public Name: string;
  public VendorId: number;
  public StartDate: Date;
  public EndDate: Date;
  public IsWalkin: boolean;
  public EventNumber: string;
  public EventModeId: number;
  public Location: string;
  public Telephone: string;
  public Industry: string;
  public Inactive: boolean;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public PartnerId: number;
  public ReferralId: number;
  public EventStatusId: number;
  public EntityTypeId: number;
  public EntityId: number;
}

export class EventMode {
  public Id: number;
  public Name: string;
}
export class EventCost {
  public Id: number;
  public EventId: number;
  public Travel: number;
  public Show: number;
  public Notes: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
