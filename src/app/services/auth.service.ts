import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Injectable()

export class AuthService {

    public isAuthenticated: boolean;
    public user: User;

    constructor(private http: HttpClient,
                private router: Router) {
        // check loginToken
        this.isAuthenticated = !!window.localStorage.getItem('loginToken');
    }

    login(email: string, password: string) {
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/login', {
                'email': email,
                'password': password
            }).subscribe((data: { token: string }) => {
                window.localStorage.setItem('loginToken', data.token);
                this.isAuthenticated = true;
                // set user
                this.setUser(email);

                o.next(data.token);
                return o.complete();
            }, (error) => {
                return o.error(error);
            });
        });
    }


    private setUser(email) {
        // return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/getUser', {
                params: { email: email },
                headers: this.getRequestHeaders()
            }).subscribe((user: any) => {
                this.user = user;
                window.localStorage.setItem('user', JSON.stringify(this.user));
        });
    }

    registerUser(user) {
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/register', {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'password': user.password
            }).subscribe((data: any) => {
                window.localStorage.setItem('user', JSON.stringify(this.user));

                o.next(this.user);
                return o.complete();
            }, (error) => {
                return o.error(error);
            });
        });
    }

    getUser() {
        return this.user;
    }

    logout() {
        window.localStorage.removeItem('loginToken');
        window.localStorage.removeItem('user');
        this.isAuthenticated = false;
        this.router.navigateByUrl('/login');
    }

    public getRequestHeaders() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'));
    }
}
