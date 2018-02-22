import {Component, Injector, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {GalleryService} from '../../services/gallery.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    private galleries;
    private galleryService: GalleryService;
    private selectCount = 10;
    private galleriesCount;

    constructor(private injector: Injector,
                private auth: AuthService) {
        this.loadData();
    }

    private loadData() {
        this.galleryService = this.injector.get(GalleryService);
        this.galleryService.getGalleries(this.selectCount).subscribe(
            data => {
                this.galleries = data;

                // galleries count
                this.galleriesCount = this.galleries.length;
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }

    ngOnInit() {
    }

    loadMore() {
        this.selectCount += 10;
        this.loadData();
    }

}
