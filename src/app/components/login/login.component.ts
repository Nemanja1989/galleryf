import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth.service';
import {GalleryService} from '../../services/gallery.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private authService: AuthService,
                private router: Router,
                private galleryService: GalleryService) {
        this.galleryService.area = '';
    }

    ngOnInit() {
    }

    login(email, password) {
        this.authService.login(email, password).subscribe(
            () => {
                this.router.navigateByUrl('/');
            }, (err: HttpErrorResponse) => {
                alert(`${err.error.error}`);
            }
        );
    }

    logout() {
        this.authService.logout();
    }

}
