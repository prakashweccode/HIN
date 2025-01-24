export class Todo {
  public Id: number;
  public TodoName: string;
  public Subject: string;
  public StartDate: Date;
  public EndDate: Date;
  public Color: string;
  public VendorId: number;
  public AssignedTo: number;
  public AssignedName: string;
  public AssignedType: string;
  public CompletedBy: number;
  public Notes: string;
  public PipelineGroupId: number;
  public PipelineId: number;
  public IsRecurrence: boolean;
  public RecurrenceId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public ImportanceId: number;
  public LocationTitle: string;
  public EntityTypeId: number;
  public EntityId: number;
  public SecurityGroupId: number;
  public TodoNumber: string;
  public IsDone: boolean;
}
export class Importance {
  public Id: number;
  public Name: string;
}

