import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {CreategalleryComponent} from '../components/creategallery/creategallery.component';
import {HomepageComponent} from '../components/homepage/homepage.component';
import {MygalleryComponent} from '../components/mygallery/mygallery.component';
import {AuthGuard} from '../guards/auth.guard';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class RoutingModule {
}

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/all-galleries',
        pathMatch: 'full'
    },
    {
        path: 'all-galleries',
        component: HomepageComponent
    },
    {
        path: 'my-galleries',
        component: MygalleryComponent,
        canActivate: [ AuthGuard ],
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'create',
        component: CreategalleryComponent,
        canActivate: [ AuthGuard ],
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
