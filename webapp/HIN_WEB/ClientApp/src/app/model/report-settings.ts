export class ReportSettings {
}
export class SearchCriteria {
  public Id: number;
  public Name: string;
  public Inactive: boolean;
  public Type: number;
}
export class DashBoardQueries {
  public Id: number;
  public FieldName: string;
  public CriteriaName: string;
  public FromValue: string;
  public ToValue: string;
  public FieldType: string;
  public DashboardConfigId: number;
  public CreatedBy: string;
  public CreatedOn: Date;
  public UpdatedBy: string;
  public UpdatedOn: Date;
  public CreatedById: number;
  public UpdatedById: number;
  public searchValues: [];
}
export class DashboardConfigFields {
  public Id: number;
  public FieldName: string;
  public Type: string;
  public Inactive: boolean;
  public Entity: number;
}
export class DashboardUserConfig {
  public Id: number;
  public ReportId: number;
  public Name: string;
  public Query: string;
  public Inactive: boolean;
  public UserId: number;
  public CreatedOn: Date;
  public UpdatedOn: Date;
  public CreatedBy: string;
  public UpdatedBy: string;
  public CreatedById: number;
  public UpdatedById: number;
}
export class DashboardSettingsModel {
  public DashBoardQueries: Array<DashBoardQueries>;
  public DashoardUserConfig: DashboardUserConfig;
  public EntityName: string;
}
export class ChartConfig {
  public Id: number;
  public Name: string;
  public ChartType: number;
  public DashboardConfigId: number;
  public GroupById: number;
  public AggregateOneId: number;
  public AggregateTwoId: number;
  public AggregateOperationId: number;
  public Size: number;
  public DisplayChart: boolean;
  public DisplayLabel: boolean;
  public ChartData: any;
}
export class VwDashboardChartConfig {
  public Id: number;
  public DashboardConfigName: string;
  public Query: string;
  public Inactive: boolean;
  public UserId: number;
  public ChartType: number;
  public ChartConfigName: string;
  public AggregateOneId: number;
  public AggregateTwoId: number;
  public AggregateOperationId: number;
  public GroupById: number;
  public Size: number;
  public DisplayChart: boolean;
}

