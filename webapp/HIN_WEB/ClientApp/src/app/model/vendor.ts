export class Vendor {
  public VendorId: number;
  public PipelineGroupId: number;
  public PipelineId: number;
  public Address: string;
  public City: string;
  public Country: string;
  public State: string;
  public ZipCode: string;
  public Website: string;
  public Name: string;
  public Telephone: string;
  public Industry: number;
  public EndOfContract: Date;
  public IsReferral: boolean;
  public IsNotPayReferral: boolean;
  public ReferralTypeId: number;
  public ReferralFees: number;
  public ReccuringTypeId: number;
  public ReferralFeeId: number;
  public PaymentModelId: number;
  public VendorNumber: string;
  public Inactive: boolean;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public OriginId: number;
  public SocialMediaId: number;
  public SocialMediaLink: string;
  public EventId: number;
  public OriginsWebsite: string;
  public NetworkingId: number;
  public NetworkContactId: number;
  public NotPayReferralId: number;
  public OriginsDate: Date;
  public OriginNotes: string;
  public LeadId: number;
  public ProviderTypeId: number;
  public IsPerReferralFee: boolean;
  public ReferralDropdownId: number;
  public SecurityGroupId: number;
  public AssignedTo: number;
  public Reason: string;
  public VendorStatus: number;
  public CompanyName: string;
}
export class PaymentMode {

  public Id: number;
  public Name: string;

}
export class ReferralFee {
  public Id: number;
  public Name: string;
}

export class VendorContact {
  public Id: number;
  public VendorId: number;
  public ContactId: number;
  public ContactName: string;
  public CalendarInviteType: number;
  public ZoomId: string;
  public CellNumber: string;
  public OfficeNumber: string;
  public StartDate: Date;
  public EndDate: Date;
  public Email: string;
  public AssignedTo: number;
  public SalesMan: number;
  public Notes: string;
  public ContactTitle: string;
  public CompletedStatusId: number;
  public VendorTimeCostId: number;
  public VendorMaterialCostId: number;
  public Color: string;
  public StepTypeId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
export class VendorContactNextStep {
  public Id: number;
  public ContactId: number;
  public ContactName: string;
  public CalendarInviteType: number;
  public ZoomId: string;
  public CellNumber: string;
  public Email: string;
  public OfficeNumber: string;
  public AssignedTo: number;
  public Notes: string;
  public DateTime: Date;
  public ContactTitle: string;
  public StepTypeId: number;
  public StartDate: Date;
  public StatusId: number;
  public Salesman: number;
  public VendorContactId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;

}
export class VendorMaterialCost {
  public Id: number;
  public Product: string;
  public Quantity: number;
  public Price: number;
  public Notes: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
export class VendorTimeCost {
  public Id: number;
  public Name: string;
  public Skill: string;
  public Cost: number;
  public StartTime: Date;
  public EndTime: Date;
  public TotalTime: number;
  public Notes: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
