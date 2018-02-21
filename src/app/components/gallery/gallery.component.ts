import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Gallery} from '../../models/gallery';
import {GalleryService} from '../../services/gallery.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Comment} from '../../models/comment';
import {AuthService} from '../../services/auth.service';
import {CommentService} from '../../services/comment.service';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    private gallery;
    private params;
    private comments;

    constructor(private route: ActivatedRoute,
                private galleryService: GalleryService,
                private injector: Injector,
                private commentService: CommentService) {
        // once we have post ID, we can fetch it from our array in PostsService
        this.route.params.subscribe((params: Params) => {
            this.params = params;

        });

        this.loadData();
        this.loadComments();
    }

    private loadData() {
        this.galleryService = this.injector.get(GalleryService);
        this.galleryService.getById(this.params['id']).subscribe(
            data => {
                this.gallery = data[0];
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }

    loadComments() {
        this.commentService.loadCommentsById(this.params['id']).subscribe(
            data => {
                this.comments = data;
                console.log(this.comments);
                console.log('asd');
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
        // ovde loaduj commentare
    }

    addComment(comment: Comment) {
        let user = JSON.parse(window.localStorage.getItem('user'));
        let userId = user[0]['id'];
        this.commentService.addComment(comment.content, this.params['id'],userId).subscribe(
            data => {
                // this.comment = data;
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }

    ngOnInit() {
    }

}


