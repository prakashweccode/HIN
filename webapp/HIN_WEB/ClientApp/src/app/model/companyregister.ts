export class Companyregister {
  public RegisterId: number;
  public CompanyName: string;
  public PhoneNumber: number;
  public Extension: string;
  public FaxNumber: string;
  public ContactFirstName: string;
  public ContactMiddleName: string;
  public ContactLastName: string;
  public ContactTitle: string;
  public CellNumber: number;
  public Email: string;
  public Address: string;
  public City: string;
  public State: string;
  public ZipCode: string;
  public Country: string;
  public Password: string;
  public ConfirmPassword: string;
  public UpdatedOn: Date;
  public UpdatedBy: string;
  public UpdatedById: number;
  public CreatedOn: Date;
  public CreatedBy: string; 
  public CreatedById: number;
  public MaximumUser: number;
  public UserName: string;
  public CompanyLogo: string;
}

export class CompanySettings {
  public Id: number;
  public CompanyId: number;
  public SettingsId: number;
  public Value: string;
}

export class Settings {
  public Id: number;
  public Name: string;
  public Type: string;
}
