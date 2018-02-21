import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Gallery} from '../models/gallery';

@Injectable()
export class GalleryService {

    private galleries;
    private myGalleries;
    private gallery;

    constructor(private http: HttpClient,
                private authService: AuthService) {
    }

    getGalleries(selectCount) {
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
    }

    getMyGalleries(userId, selectCount) {
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
    }

    getById(id: string) {
        console.log(id);
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/singleGallery', {
                params: {galleryId: id},
                headers: this.authService.getRequestHeaders()
            }).subscribe((gallery: any[]) => {
                console.log(gallery);
                console.log('asd');
                this.gallery = gallery;

                o.next(this.gallery);
                return o.complete();
            });
        });
    }

}
