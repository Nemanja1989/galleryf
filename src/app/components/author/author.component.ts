import {Component, Injector, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {GalleryService} from '../../services/gallery.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

    private galleries;
    private selectCount = 10;
    private galleriesCount;

    constructor(private injector: Injector,
                private route: ActivatedRoute,
                private galleryService: GalleryService) {
        this.route.params.subscribe((params: Params) => {
            // set service data
            this.galleryService.area = 'authors';
            this.galleryService.search_term = params['term'];
            if (params['term'] === undefined) {
                this.galleryService.search_term = '';
            }
            this.galleryService.author_id = params['id'];

            // now load data
            this.loadData();
        });
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

    ngOnInit() {
    }

    loadMore() {
        this.selectCount += 10;
        this.galleryService.selectCount += 10;
        this.loadData();
    }

}
