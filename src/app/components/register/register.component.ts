import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {User} from '../../models/user';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public user: User;

    constructor() {
        // create empty team because of ngModel in form
        this.user = new User(0, '', '', '', '');
    }

    ngOnInit() {
    }

    registerUser(user) {
        console.log(user);
    }

}
