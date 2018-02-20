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
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from './services/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {GalleryService} from './services/gallery.service';


@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        NavbarComponent,
        HomepageComponent,
        CreategalleryComponent,
        LoginComponent,
        RegisterComponent,
        MygalleryComponent
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
        GalleryService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
