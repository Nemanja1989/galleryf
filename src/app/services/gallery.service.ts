import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Gallery} from '../models/gallery';
import {ActivatedRoute, Router} from '@angular/router';

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

    update(gallery: Gallery) {
        return new Observable((o: Observer<any>) => {
            this.http.put('http://localhost:8000/api/galleries', {
                'params': gallery
            }, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((c: any) => {

                o.next(c);
                return o.complete();
            });
        });

    }

    public create(gallery: Gallery, userId) {
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/galleries', {
                'title': gallery.title,
                'description': gallery.description,
                'images': gallery.images,
                'user_id': userId.toString()
            }, {
                headers: this.authService.getRequestHeaders()
            }).subscribe(
                (data: Gallery) => {
                    o.next(data);

                    return o.complete();
                },
                (err) => {
                    return o.error(err);
                }
            );
        });
    }

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
