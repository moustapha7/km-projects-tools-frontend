export class SignUpInfo {
    firstname : string;
	name: string;
    username: string;
    email: string;
    role: string[];
    password: string;
 
    constructor( firstname : string,name: string, username: string, email: string, password: string) {
        this.firstname=firstname;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = ['user'];
    }
}
