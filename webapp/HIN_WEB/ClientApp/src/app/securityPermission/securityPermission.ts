export class SecurityPermission {
  public idGroup: number;
  public idPermis: string;
  public stat_grant: boolean;
  public stat_read: boolean;
  public id: number;
  public name: string;
  public parent: string;
}

export class TreeNode {
  public Node: SecurityPermission;
  public Children: SecurityPermission[];
}

export class UserGroup {
  public userGroupId: number;
  public name: string;
  public description: string;
}
