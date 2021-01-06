import { Departement } from "./departement";

export class SignUpInfo {
    firstname : string;
	name: string;
    username: string;
    email: string;
    role: string[];
    password: string;
    departement : Departement
 
    constructor( firstname : string,name: string, username: string, email: string, password: string, departement : Departement) {
        this.firstname=firstname;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.departement = departement;
        this.role = ['user'];
    }
}
