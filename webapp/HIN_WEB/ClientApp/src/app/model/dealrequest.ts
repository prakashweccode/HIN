import { Users } from "../users/users";
import { Reason } from "./reason";

export class Dealrequest {
  public From: Date;
  public To: Date;
  public users: Array<Users>;
  public reasons: Array<Reason>;

}
export class WinLossRequest {

  public WinLossRequest: Dealrequest = new Dealrequest;

}
export class WonDealsRequest {

  public WonDealsRequest: Dealrequest = new Dealrequest;

}
export class DealslostyyreasonRequest {

  public DealslostyyreasonRequest: Dealrequest = new Dealrequest;
 

}
export class RevenueforecastbyrepRequest {

  public RevenueforecastbyrepRequest: Dealrequest = new Dealrequest;
  
}
export class LeadConversionRequest {

  public LeadConversionRequest: Dealrequest = new Dealrequest;

}
export class ProposalclosedbyrepRequest {

  public ProposalclosedbyrepRequest: Dealrequest = new Dealrequest;

}
export class OpportunitiesovertimeRequest {

  public OpportunitiesovertimeRequest: Dealrequest = new Dealrequest;

}
export class OpportunitieslostbyreasonRequest {

  public OpportunitieslostbyreasonRequest: Dealrequest = new Dealrequest;

}
export class ProposalsclosedbycustomerRequest {

  public ProposalsclosedbycustomerRequest: Dealrequest = new Dealrequest;

}




