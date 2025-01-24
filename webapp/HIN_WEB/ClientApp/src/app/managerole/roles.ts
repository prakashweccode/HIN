export class Roles {
  public RoleId: number;
  public RoleName: string;
  public Status: boolean;
}
export class Permissions {
  public Id: number;
  public Name: string;
  public Description: string;
  public IsActive: string;
  public IsSelected: boolean;
}
export class RolePermissions {
  public Id: number;
  public PermissionId: number;
  public RoleId: number;
  public IsEnabled: boolean;
}
