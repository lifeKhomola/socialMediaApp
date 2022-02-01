import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';

import {UserGuard} from './services/user.guard';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'my-account', component: UserEditComponent, canActivate:[UserGuard]},
    {path: 'connect', component: UsersComponent, canActivate:[UserGuard]},
    {path: 'connect/:page', component: UsersComponent, canActivate:[UserGuard]},
    {path: 'feed', component: TimelineComponent, canActivate:[UserGuard]},
    {path: 'profile/:id', component: ProfileComponent, canActivate:[UserGuard]},
    {path: 'following/:id/:page', component: FollowingComponent, canActivate:[UserGuard]},
    {path: 'followed/:id/:page', component: FollowedComponent, canActivate:[UserGuard]},
    {path: '**', component: HomeComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
