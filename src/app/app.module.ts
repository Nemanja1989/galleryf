import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LayoutComponent} from './components/layout/layout.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomepageComponent} from './components/homepage/homepage.component';
import {CreategalleryComponent} from './components/creategallery/creategallery.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AppRoutingModule} from './routing/routing.module';
import {MygalleryComponent} from './components/mygallery/mygallery.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {GalleryService} from './services/gallery.service';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AuthorComponent } from './components/author/author.component';
import {CommentService} from './services/comment.service';
import { SearchComponent } from './components/search/search/search.component';


@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        NavbarComponent,
        HomepageComponent,
        CreategalleryComponent,
        LoginComponent,
        RegisterComponent,
        MygalleryComponent,
        GalleryComponent,
        AuthorComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        GalleryService,
        CommentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
