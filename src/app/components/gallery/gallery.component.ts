import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Gallery} from '../../models/gallery';
import {GalleryService} from '../../services/gallery.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Comment} from '../../models/comment';
import {AuthService} from '../../services/auth.service';
import {CommentService} from '../../services/comment.service';
import {User} from '../../models/user';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    public gallery: any[] = [];
    private params;
    private comments;
    private comment: Comment;
    private user: User;

    constructor(private route: ActivatedRoute,
                private galleryService: GalleryService,
                private injector: Injector,
                private commentService: CommentService,
                private auth: AuthService,
                private router: Router) {
        // once we have post ID, we can fetch it from our array in PostsService
        this.route.params.subscribe((params: Params) => {
            this.params = params;

        });

        // set user for comment check is owner
        this.user = JSON.parse(window.localStorage.getItem('user'));
        this.user = this.user[0];

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

    editGallery(gallery_id) {
        this.router.navigateByUrl('/edit-gallery/' + gallery_id);
    }

    loadComments() {
        this.commentService.loadCommentsById(this.params['id']).subscribe(
            data => {
                this.comments = data;
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }

    addComment(comment: Comment) {
        let user = JSON.parse(window.localStorage.getItem('user'));
        let userId = user[0]['id'];
        this.commentService.addComment(comment.content, this.params['id'], userId).subscribe(
            data => {
                this.loadComments();
            },
            (err: HttpErrorResponse) => {
                alert(`Backend returned code ${err.status} with message: ${err.error}`);
            }
        );
    }

    removeGallery(gallery_id) {
        if (confirm("Are you sure?")) {
            this.galleryService.removeGallery(gallery_id).subscribe(
                data => {
                    this.router.navigateByUrl('/my-galleries');
                },
                (err: HttpErrorResponse) => {
                    alert(`Backend returned code ${err.status} with message: ${err.error}`);
                }
            );
        }
    }

    removeComment(comment) {
        if (confirm("Are you sure?")) {
            // remove now
            this.commentService.removeComment(comment).subscribe(
                data => {
                    this.loadComments();
                },
                (err: HttpErrorResponse) => {
                    alert(`Backend returned code ${err.status} with message: ${err.error}`);
                }
            );
        }

    }

    ngOnInit() {
    }

}


