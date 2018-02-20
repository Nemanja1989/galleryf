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
                o.next(data.token);
                return o.complete();
            }, (error) => {
                return o.error(error);
            });
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

                o.next(this.user);
                return o.complete();
            }, (error) => {
                return o.error(error);
            });
        });
    }

    logout() {
        window.localStorage.removeItem('loginToken');
        this.isAuthenticated = false;
        this.router.navigateByUrl('/login');
    }

    public getRequestHeaders() {
        return new HttpHeaders().set('Authorization', 'Bearer ' + window.localStorage.getItem('loginToken'));
    }
}
