import { Departement } from "./departement";
import { Role } from "./role";

export class User {
    id : number;
    firstname : string;
    name: string;
      username: string;
      email: string;
      role: string[];
      password: string;
      departement : Departement;
    profileUser : string;
    activated : Boolean;
    rolee : Role[];
 
   
}
