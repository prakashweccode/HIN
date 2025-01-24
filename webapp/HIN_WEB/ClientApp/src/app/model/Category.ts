export class Category {
  public Id: number;
  public Name: string;
  public DisplayName: string;
  public IsActive: boolean;
   public UpdatedOn: Date ;
 public UpdatedBy: string ;
 public UpdatedById: number ;
 public CreatedOn: Date ;
 public CreatedBy: string ;
 public CreatedById: number ;
  public EntityTypeId: number;
}
export class CategoryValues {
  public Id: number;
  public CategoryId: number;
  public EntityId: number;
  public EntityTypeId: number;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
