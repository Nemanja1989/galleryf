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
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
