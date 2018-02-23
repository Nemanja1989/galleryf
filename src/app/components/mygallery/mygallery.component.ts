import {Component, Injector, OnInit} from '@angular/core';
import {GalleryService} from '../../services/gallery.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-mygallery',
    templateUrl: './mygallery.component.html',
    styleUrls: ['./mygallery.component.css']
})
export class MygalleryComponent implements OnInit {

    private galleries;
    private selectCount = 10;
    private galleriesCount;

    constructor(private injector: Injector,
                private route: ActivatedRoute,
                private galleryService: GalleryService
    ) {
        this.route.params.subscribe((params: Params) => {
            // set service data
            this.galleryService.area = 'my';
            this.galleryService.search_term = params['term'];
            if (params['term'] === undefined) {
                this.galleryService.search_term = '';
            }
            this.galleryService.area = 'my';
            const user = JSON.parse(window.localStorage.getItem('user'));
            const userId = user[0]['id'];
            this.galleryService.author_id = userId;

            // now load data
            this.loadData();
        });
    }

    ngOnInit() {
    }

    private loadData() {
        this.galleryService.loadGalleries().subscribe(
            data => {
                this.galleries = data['galleries'];
                this.galleriesCount = data['count'];

            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }

    loadMore() {
        this.selectCount += 10;
        this.galleryService.selectCount += 10;
        this.loadData();
    }

}
