import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Gallery} from '../models/gallery';

@Injectable()
export class GalleryService {

    public gallery;
    public selectCount = 10;
    public area = '';
    public author_id = 0;
    public search_term = '';
    public loadedGalleries: any[];
    public possibleCount;

    constructor(private http: HttpClient,
                private authService: AuthService) {
    }

    /*
    getGalleries(selectCount) {
        this.selectCount = selectCount;
        // clear array after logout
        this.galleries = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/all-galleries', {
                params: {selectCount: selectCount},
                headers: this.authService.getRequestHeaders()
            }).subscribe((galleries: any[]) => {
                this.galleries = galleries['data'];

                o.next(this.galleries);
                return o.complete();
            });
        });
    }*/

    loadGalleries() {
        // clear array after logout
        this.loadedGalleries = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/loadGalleries', {
                params: {selectCount: this.selectCount.toString(),
                        area: this.area,
                        author_id: this.author_id.toString(),
                        search_term: this.search_term
                },
                headers: this.authService.getRequestHeaders()
            }).subscribe((data: any[]) => {
                this.loadedGalleries = data['galleries'];
                this.possibleCount = data['count'];

                o.next(data);
                return o.complete();
            });
        });
    }

    /*
    getMyGalleries(userId, selectCount) {
        this.selectCount = selectCount;
        // clear array after logout
        this.myGalleries = [];
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/my-galleries', {
                params: {userId: userId, selectCount: selectCount},
                headers: this.authService.getRequestHeaders()
            }).subscribe((galleries: any[]) => {
                this.myGalleries = galleries['data'];

                o.next(this.myGalleries);
                return o.complete();
            });
        });
    }*/

    getById(id: string) {
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/singleGallery', {
                params: {galleryId: id},
                headers: this.authService.getRequestHeaders()
            }).subscribe((gallery: any[]) => {
                this.gallery = gallery;

                o.next(this.gallery);
                return o.complete();
            });
        });
    }

    removeGallery(gallery_id: string) {
        return new Observable((o: Observer<any>) => {
            this.http.delete('http://localhost:8000/api/removeGallery/' + gallery_id, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((c: any[]) => {

                o.next(c);
                return o.complete();
            });
        });
    }

}
