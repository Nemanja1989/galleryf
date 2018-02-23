import { Component, OnInit } from '@angular/core';
import {GalleryService} from '../../services/gallery.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

    constructor(private galleryService: GalleryService) {
        this.galleryService.area = '';
    }

  ngOnInit() {
  }

}
