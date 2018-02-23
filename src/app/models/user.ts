/*
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
}*/
export class User {
    public id: number;
    public first_name = '';
    public last_name = '';
    public email = '';
    public password = '';
    public confirm_password = '';
    public terms_and_conditions = false;

    constructor(data ?: {
        id ?: number,
        first_name ?: string,
        last_name ?: string,
        email ?: string,
        password ?: string,
        confirm_password ?: string,
        terms_and_conditions ?: boolean
    }) {
        Object.assign(this, data || {});
    }
}


