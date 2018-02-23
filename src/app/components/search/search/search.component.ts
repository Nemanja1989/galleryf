import {Component, OnInit} from '@angular/core';
import {GalleryService} from '../../../services/gallery.service';
import {HttpErrorResponse} from '@angular/common/http';
import {HomepageComponent} from '../../homepage/homepage.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    private searchGalleriesTerm = '';

    constructor(private galleryService: GalleryService,
                private router: Router
                ) {
    }

    ngOnInit() {
    }

    searchGalleries() {
        let search_route = '/search';

        if (this.galleryService.area === 'my') {
            search_route = '/my-galleries/search';
        } else if (this.galleryService.area === 'authors') {
            search_route = '/authors/' + this.galleryService.author_id + '/search';
        }

        this.router.navigate([search_route, this.searchGalleriesTerm]);
    }

}
