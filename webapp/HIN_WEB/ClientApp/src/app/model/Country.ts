export class Country {
  public Id: number;
  public SortName: string;
  public Name: string;
  public PhoneCode: number;
}

export class State {
  public Id: number;
  public Name: string;
  public CountryId: number;
}

export class City {
  public Id: number;
  public Name: string;
  public StateId: number;
}

