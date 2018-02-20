import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Gallery} from '../models/gallery';

@Injectable()
export class GalleryService {

    private galleries;

    constructor(private http: HttpClient,
                private authService: AuthService) {
    }

    getGalleries() {
        // clear array after logout
        this.galleries = [];
        console.log('ovde sam');
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/all-galleries', {
                headers: this.authService.getRequestHeaders()
            }).subscribe((galleries: any[]) => {
                this.galleries = galleries['data'];
                /*
                galleries['data'].forEach((c) => {
                    this.galleries.push(new Gallery(c.id, c.first_name, c.last_name, c.email));
                });*/

                o.next(this.galleries);
                return o.complete();
            });
        });
    }

}
