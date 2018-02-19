export class User {

    id;
    first_name;
    last_name;
    email;
    password;

    constructor( id: number , first_name: string, last_name: string,  email: string, password: string) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }
}

