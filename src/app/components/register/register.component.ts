import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public user: User;

    constructor(private http: HttpClient,
                private authService: AuthService,
                private router: Router) {
        // create empty team because of ngModel in form
        this.user = new User(0, '', '', '', '');
    }

    ngOnInit() {
    }

    registerUser(user: User) {
        // sifra je test123
        this.authService.registerUser(user).subscribe(
            () => {
                // login and redirect to home page
                this.authService.login(user.email, user.password).subscribe(
                    () => {
                        this.router.navigateByUrl('/');
                    }, (err: HttpErrorResponse) => {
                        alert(`${err.error.error}`);
                    }
                );
            }, (err: HttpErrorResponse) => {
                alert(`${err.error.error}`);
            }
        );
        /*
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/register', {
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email,
                'password': user.password
            }, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((c: any) => {
                let newUser = new User(c.id, c.first_name, c.last_name, c.email, c.password);

                o.next(this.user);
                return o.complete();
            });
        });*/
    }

}
