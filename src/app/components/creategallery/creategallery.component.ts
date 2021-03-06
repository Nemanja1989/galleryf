import {Component, OnInit} from '@angular/core';
import {GalleryService} from '../../services/gallery.service';
import {Router} from '@angular/router';
import {Gallery} from '../../models/gallery';
import {HttpErrorResponse} from '@angular/common/http';
import {Image} from '../../models/image';

@Component({
    selector: 'app-creategallery',
    templateUrl: './creategallery.component.html',
    styleUrls: ['./creategallery.component.css']
})
export class CreategalleryComponent implements OnInit {

    public gallery: Gallery = new Gallery();

    public errors: any[] = [];

    constructor(
        private galleryService: GalleryService,
        private router: Router
    ) {
        this.galleryService.area = '';
    }

    ngOnInit() {
    }

    public submit() {
        const user = JSON.parse(window.localStorage.getItem('user'));
        const userId = user[0]['id'];
        this.galleryService.create(this.gallery, userId)
            .subscribe(() => {
                this.router.navigateByUrl('/');
            }, (e) => {
                let errorObjects = e.error.errors;

                this.errors = Object.keys(errorObjects).map(key => {
                        return errorObjects[key][0];
                    },
                    (err: HttpErrorResponse) => {
                        alert(`${err.error.error}`);
                    });
            });
    }

    cancel() {
        this.router.navigateByUrl('/my-galleries');
    }

    public addNewImage() {
        this.gallery.images.push(new Image());
    }

    public moveImageUp(image: Image) {
        this.moveImage(image, -1);
    }

    public moveImageDown(image: Image) {
        this.moveImage(image, 1);
    }

    public moveImage(image: Image, delta: number) {
        const index = this.gallery.images.indexOf(image);
        const newIndex = index + delta;

        if (newIndex < 0  || newIndex === this.gallery.images.length) {
            return;
        }

        const indexes = [index, newIndex].sort();

        this.gallery.images.splice(indexes[0], 2, this.gallery.images[indexes[1]], this.gallery.images[indexes[0]]);
    }

    public setOrder(index, image: Image) {
        image.order = index + 1;

        return image.order;
    }

    public removeImage(image: Image) {
        const index = this.gallery.images.indexOf(image);

        this.gallery.images.splice(index, 1);
    }
}
