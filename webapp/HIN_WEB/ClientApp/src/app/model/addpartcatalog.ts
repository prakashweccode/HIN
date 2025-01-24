import { Quote } from "./quote";

export class PartCatalog {
  public Id: number;
  public PartCode: string;
  public PartDescription: string;
  public Uom: string;
  public EstimateCost: number;
  public SalesPrice: number;
  public IsNonTaxable: boolean;
  public Uomid: number;
  public QuoteId: number;
  public LeadId: number;
  public DealId: number;
}



export class LinePart {
  public Id: number;
  public Name: string;
  public QuoteId: number;
  public PartCatalogId: number;
  public PartDescription: string;
  public Quantity: number;
  public UnitPrice: number;
  public Tax: boolean;
  public TotalPrice: number;
  public DiscountByLine: number;
  public Available: number;
  public ProfitPercentage: number;
  public ProfitDollar: number;
  public Profit: number;
  public PriceDiscount: number;
  public ExpectedShipDate: Date;
  public PartCatalog: PartCatalog;
  public Quote: Quote;
}

