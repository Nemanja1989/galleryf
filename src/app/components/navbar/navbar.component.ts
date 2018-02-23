import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {GalleryService} from '../../services/gallery.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private auth: AuthService,
                private galleryService: GalleryService) {
    }

    ngOnInit() {
    }

}
