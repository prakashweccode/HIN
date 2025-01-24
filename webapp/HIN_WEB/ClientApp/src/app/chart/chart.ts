export class Chart {
  public Width: number;
  public NeedleValue: number;
  public CentralLabel: string;
  public Options: ChartOptions = new ChartOptions();
  public Name: string;
  public DropDownName: string;
  public BottomLabel: string;
  public ShowHeaderChart: boolean;
  public ShowDashboardChart: boolean;
  public ShowUserQuoteChart: boolean;
  public toggle: boolean;
}

export class ChartOptions {
  public hasNeedle: boolean = true;
  public needleColor: string = 'black';
  public needleUpdateSpeed: number = 1000;
  public arcColors = [];
  public arcDelimiters = [];
  public notyLabels = [];
  //public arcLabels = [];
  //public arcLabelFontSize: 11,
  public rangeLabel = [];
  public needleStartValue: number = 0;
};
