import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Comment} from '../models/comment';

@Injectable()
export class CommentService {

    private comment;

    constructor(private http: HttpClient,
                private authService: AuthService) {
    }


    addComment(comment, gallery_id, user_id) {
        console.log(comment);
        return new Observable((o: Observer<any>) => {
            this.http.post('http://localhost:8000/api/commentAdd', {
                'comment': comment,
                'gallery_id': gallery_id,
                'user_id': user_id
            }, {
                headers: this.authService.getRequestHeaders()
            }).subscribe((c: any) => {
                // nothing
                o.next(this.comment);
                return o.complete();
            });
        });
    }

    loadCommentsById(id) {
        return new Observable((o: Observer<any>) => {
            this.http.get('http://localhost:8000/api/loadCommentsByGallery', {
                params: {galleryId: id},
                headers: this.authService.getRequestHeaders()
            }).subscribe((comments: any[]) => {

                o.next(comments);
                return o.complete();
            });
        });
    }

}
