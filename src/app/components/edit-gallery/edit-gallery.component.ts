import {Component, OnInit} from '@angular/core';
import {Gallery} from '../../models/gallery';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GalleryService} from '../../services/gallery.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Image} from '../../models/image';

@Component({
    selector: 'app-edit-gallery',
    templateUrl: './edit-gallery.component.html',
    styleUrls: ['./edit-gallery.component.css']
})
export class EditGalleryComponent implements OnInit {

    public gallery: Gallery = new Gallery();

    public errors: any[] = [];

    constructor(
        private galleryService: GalleryService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.galleryService.area = '';
        this.route.params.subscribe((params: Params) => {
            this.galleryService.getById(params['id']).subscribe(
                data => {
                    // small hack
                    data[0]['images'] = data[0]['pictures'];
                    this.gallery = data[0];
                },
                (err: HttpErrorResponse) => {
                    alert(`Backend returned code ${err.status} with message: ${err.error}`);
                }
            );

        });
    }

    ngOnInit() {
    }

    cancel() {
        this.router.navigateByUrl('/galleries/' + this.gallery.id);
    }

    public submit() {
        this.galleryService.update(this.gallery)
            .subscribe(() => {
                this.router.navigateByUrl('/galleries/' + this.gallery.id);
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


        if (index === 0) {
            return;
        }

        this.gallery.images.splice(index, 1);
    }

}
