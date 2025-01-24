import { Users } from "../users/users";

export class Navbar {
  public User: Users = new Users();
  public isValid: boolean;
  public Token: string;
}
