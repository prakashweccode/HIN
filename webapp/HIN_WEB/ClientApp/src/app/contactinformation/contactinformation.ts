import { Timecost } from "../model/timecost";
import { Materialcost } from "../model/materialcost";

export class Contactinformation {
  public Id: number;
  public FirstName: string;
  public LastName: string;
  public ContactName: string;
  public MiddleName: string;
  public SecondMiddleName: string;
  public SecondLastName: string;
  public ContactTitle: string;
  public OfficeNumber: string;
  public Gender: number;
  public Inactive: boolean;
  public Extension: string;
  public FaxNumber: string;
  public CellNumber: string;
  public Email: string;
  public Type: number;
  public EntityId: number;
  public LinkedInProfile: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public Notes: string;
  public IsAdditionalInfo: boolean;
  public IsMember: boolean;
  public IsGuest: boolean;
  public BatchNumber: string;
  public Address: string;
  public City: string;
  public State: string;
  public Country: string;
  public ZipCode: string;
  public ContactGroupId: number;
  public ContactInfoNumber: string;
  public ContactImage: string;
  public OrginId: number;
  public LeadId: number;
  public VendorId: number;
  public PartnerId: number;
  public IsPrimary: boolean;
  public Website: string;
}
export class DealContact {
  public Id: number;
  public DealId: number;
  public EntityTypeId: number;
  public ContactId: number;
  public ContactName: string;
  public ContactTitle: string;
  public CalendarInviteType: number;
  public CompletedStatusId: number;
  public ZoomId: string;
  public CellNumber: string;
  public OfficeNumber: string;
  public Email: string;
  public AssignedTo: number;
  public SalesMan: number;
  public QuickNotes: number;
  public Notes: string;
  public StartDate: Date;
  public EndDate: Date;
  public Color: string;
  public timecosts: Array<Timecost>;
  public materialcosts: Array<Materialcost>;
  public StepTypeId: number;
  public IsSaved: boolean = false;
  public nextStepToggle: boolean = false;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public Other: string;
  public nextStep: DealContactNextStep = new DealContactNextStep();
}
export class LeadContact {
  public Id: number;
  public LeadId: number;
  public ContactId: number;
  public ContactName: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
export class DealContactNextStep {
  public Id: number;
  public DealId: number;
  public DealContactId: number;
  public ContactId: number;
  public ContactName: string;
  public CalendarInviteType: number;
  public ZoomId: string;
  public CellNumber: string;
  public Email: string;
  public OfficeNumber: string;
  public AssignedTo: number;
  public Notes: string;
  public EndDate: Date;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public ContactTitle: string;
  public StepTypeId: number;
  public StartDate: Date;
  public StatusId: number;
  public Salesman: number;
  public IsSaved: boolean = false;
  public QuickNotes: number;
  public ColorCode: string;
  public Other: string;
}
export class Group {
  public Id: number;
  public GroupName: string;
  public Inactive: boolean;
  public CreatedOn: Date;
  public CreatedBy: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public CreatedById: number;
  public UpdatedById: number;
}
export class ContactGroupModel {
  public Group: Group;
  public ContactInformations: Array<Contactinformation>;
}
export class ContactGroup {
  public Id: number;
  public GroupId: number;
  public ContactId: number;
}


export class SelectedContact {
  public Id: number;
  public EntityId: number;
  public EntityType: number;
}
