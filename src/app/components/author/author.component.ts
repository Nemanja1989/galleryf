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
    private galleryService: GalleryService;
    private params;
    private selectCount = 10;

    constructor(private injector: Injector,
                private route: ActivatedRoute) {
        this.route.params.subscribe((params: Params) => {
            this.params = params;
            // this.gallery = this.galleryService.getById(params['id']);

        });

        this.loadData();
    }

    loadData() {
        this.galleryService = this.injector.get(GalleryService);
        this.galleryService.getMyGalleries(this.params['id'], this.selectCount).subscribe(
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

    ngOnInit() {
    }

    loadMore() {
        this.selectCount += 10;
        this.loadData();
    }

}
