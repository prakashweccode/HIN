export class LeadEmail {
  public Id: number;
  public LeadId: number;
  public Email: string;
  public TypeId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;

}
export class LeadLabels {
  public Id: number;
  public LeadId: number;
  public LeadTypeId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}

export class LeadPhoneNumber {
  public Id: number;
  public LeadId: number;
  public PhoneNumber: string;
  public TypeId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
export class Lead {
  public LeadId: number;
  public LeadName: string;
  public FirstName: string;
  public LastName: string;
  public CompanyName: string;
  public PipelineGroupId: number;
  public PipelineId: number;
  public Address: string;
  public City: string;
  public Country: string;
  public State: string;
  public ZipCode: string;
  public Website: string;
  public AnnualRevenue: string;
  public NoOfEmployee: string;
  public Industry: number;
  public Owner: number;
  public ContactId: number;
  public LeadProvider: string;
  public LeadCost: number;
  public ExpectedRevenue: number;
  public OrganizationId: number;
  public OrganizationName: string;
  public CurrencyId: number;
  public IsCommercial: boolean;
  public Status: number;
  public OriginId: number;
  public SocialMediaId: number;
  public SocialMediaLink: string;
  public NotPayReferral: string;
  public NotPayReferralId: number;
  public OriginsLinkedIn: string;
  public OriginsWebsite: string;
  public OriginNotes: string;
  public OriginsDate: Date;
  public EventId: number;
  public VendorId: number;
  public NetworkingId: number;
  public OpportunityCount: number;
  public Inactive: boolean;
  public LeadEmail: Array<LeadEmail>;
  public LeadLabels: Array<LeadLabels>;
  public LeadPhoneNumber: Array<LeadPhoneNumber>;
  public NetworkContactId: number;
  public LeadNumber: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public LeadStatus: number;
  public PartnerId: number;
  public ReferralId: number;
  public SecurityGroupId: string;
  public Reason: string;
  public LeadFunnelStatus: number;
  public OriginLeadId: number;
  public InternalSales: number;
  public BatchNumber: string;
  public EmailAddress: string;
  public CellNumber: string;
  public OfficeNumber: string;
  public ContactTitle: string;
  public UserName: string;
  public MiddleName: string;
  public PatientLastName: string;
  public SecondMiddleName: string;
  public SecondLastName: string;
  public GenderId: number;
  public Dob: Date;
  public Occupation: string;
  public Age: number;
  public EmergencyFirstName: string;
  public EmergencyLastName: string;
  public EmergencyMiddleName: string;
  public EmergencyCellNumber: string;
  public EmergencyContactTitle: string;
}

export class LeadOriginType {
  public Id: number;
  public Name: string;
}

export class SocialMediaType {
  public Id: number;
  public Name: string;
}

export class LeadGroupMapping {
  public Id: number;
  public LeadId: number;
  public GroupId: number;
}

export class LeadStatus {
  public Id: number;
  public Name: string;
}

export class PatientForm {
  public Allergies: number;
  public Gender: number;
}

export class LeadExtend extends Lead {
  public EmergencyContact: string;
}
