import { Users } from "../users/users";
import { Deal } from "./deal";

export class Opportunityacquisitioncost {
  public UserList: Users;
  public OpportunityList: Deal;
  public OpportunityStatusId: number;
  public OppCreatedFrom: Date;
  public OppCreatedTo: Date;
  public OppClosingPercentFrom: number;
  public OppClosingPercentTo: number;
  public OppFunnelPercentFrom: number;
  public OppFunnelPercentTo: number;
  public OppEstimateFrom: Date;
  public OppEstimateTo: Date;
  public From: Date;
  public To: Date;
  public OppActualAmountFrom: number;
  public OppActualAmountTo: number;
}

