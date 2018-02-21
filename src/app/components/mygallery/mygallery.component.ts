import {Component, Injector, OnInit} from '@angular/core';
import {GalleryService} from '../../services/gallery.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-mygallery',
    templateUrl: './mygallery.component.html',
    styleUrls: ['./mygallery.component.css']
})
export class MygalleryComponent implements OnInit {

    private galleries;
    private galleryService: GalleryService;
    private selectCount = 10;

    constructor(private injector: Injector) {
        this.loadData();
    }

    ngOnInit() {
    }

    loadData() {
        let user = JSON.parse(window.localStorage.getItem('user'));
        let userId = user[0]['id'];
        console.log(userId);
        this.galleryService = this.injector.get(GalleryService);
        this.galleryService.getMyGalleries(userId, this.selectCount).subscribe(
            data => {
                console.log(data);
                this.galleries = data;
                console.log(this.galleries);
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }

    loadMore() {
        this.selectCount += 10;
        this.loadData();
    }

}
