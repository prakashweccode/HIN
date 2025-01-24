export class UserGroups {
  public UserGroupId: number;
  public Name: string;
  public Description: string;
  public IsActive: boolean;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
export class UserGroupMapping {
  public Id: number;
  public UserId: number;
  public GroupId: number;
}
