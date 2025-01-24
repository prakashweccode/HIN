export class Bulkassign {
  public LeadFunnelStatusId: number;
  public SecurityGroup: number;
  public AssignedToId: number;
  public AssignedToName: string;
  public ArrayOfData: Array<AssignedInput> = [];
  public WonActualAmount: number;
  public Reason: string;
}

export class AssignedInput {
  public Id: number;
  public EntityType: number;
}

