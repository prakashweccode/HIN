export class CustomFields {
}
export class DbPropertyTypes {
  public Id: number;
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
export class CustomProperty{
  public Id: number;
  public PropertyName: string;
  public PropertyType: number;
  public IsRequired: boolean;
  public IsImportant: boolean;
  public IsVisible: boolean;
  public IsRight: boolean;
  public EntityTypeId: number;
  public ListItems: Array<CustomFieldListItems>;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
  public IdHtml: string;
  public ColumnSize: number;
}
export class CustomPropertyValues {
  public Id: number;
  public CustomPropertyId: number;
  public PropertyValue: string;
  public EntityId: number;
  public IdHtml: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
export class CustomFieldListItems {
  public Id: number;
  public CustomPropertyId: number;
  public Description: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string;
  public CreatedById: number;
}
