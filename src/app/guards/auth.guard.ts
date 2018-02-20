import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterOutlet, RouterStateSnapshot} from "@angular/router";
import {AuthService} from '../services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {


    constructor(private router: Router,
                private authService: AuthService){

    }

    // if you are not logged in than redirect to login page
    canActivate(routeSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated) {
            this.router.navigate(['/login']);
        }

        return true;
    }
}
