export class StepsContact {
  public Id: number;
  public EntityId: number;
  public EntityTypeId: number;
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
  public StepsTimeCost: StepsTimeCost;
  public StepsMaterialCost: StepsMaterialCost;
  public Color: string;
  public StepTypeId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}


export class StepsContactNextStep {
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
  public StepsContactId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}


export class StepsMaterialCost {
  public MaterialCostId: number;
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


export class StepsTimeCost {
  public TimeCostId: number;
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
