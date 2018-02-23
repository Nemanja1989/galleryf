import {Component, Injector, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {GalleryService} from '../../services/gallery.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

    private galleries;
    private selectCount = 10;
    private galleriesCount;

    constructor(private injector: Injector,
                private auth: AuthService,
                private galleryService: GalleryService,
                private route: ActivatedRoute) {

        this.galleryService.search_term = '';
        this.route.params.subscribe((params: Params) => {
            // set service data
            this.galleryService.search_term = params['term'];
            if (params['term'] === undefined) {
                this.galleryService.search_term = '';
            }
            this.galleryService.area = 'all';
            this.galleryService.author_id = 0;

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
