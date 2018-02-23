import {Component, OnInit} from '@angular/core';
import {GalleryService} from '../../services/gallery.service';

@Component({
    selector: 'app-creategallery',
    templateUrl: './creategallery.component.html',
    styleUrls: ['./creategallery.component.css']
})
export class CreategalleryComponent implements OnInit {

    constructor(private galleryService: GalleryService) {
        this.galleryService.area = '';
    }

    ngOnInit() {
    }

}
