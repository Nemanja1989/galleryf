import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {GalleryService} from '../../services/gallery.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public user: User;

    constructor(private http: HttpClient,
                private authService: AuthService,
                private router: Router,
                private galleryService: GalleryService) {
        // create empty team because of ngModel in form
        this.user = new User();
        this.galleryService.area = '';
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
    }

}
