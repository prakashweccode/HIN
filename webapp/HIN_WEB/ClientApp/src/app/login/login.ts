import { Users } from "../users/users";

export class Login {
  public UserName: string;
  public Password: string;
  public IsMicrosoftAuth: boolean;
}
export class TwoFactor {
  public Login: Login = new Login();
  public AccessCode: string;
}

export class UserDetail {
  public User: Users = new Users();
  public isValid: boolean;
  public Token: string;
  public isAdmin: boolean;
}
