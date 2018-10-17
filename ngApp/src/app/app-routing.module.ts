import { NgModule } from '@angular/core'; // I can use the ngModel of angular
import { Routes, RouterModule } from '@angular/router';

// I import all the componants I use with routes
import { FiguresComponent } from './figures/figures.component';
import { CollectionnerComponent } from './collectionner/collectionner.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { NewFigureComponent } from './new-figure/new-figure.component';
import { MyFiguresComponent } from './my-figures/my-figures.component';
import { UpdateFigureComponent } from './update-figure/update-figure.component';

// I import the auth gard to block the routing to none connected users
import { AuthGuard } from './auth.guard';

// I set the routings of my app
const routes: Routes = [
  {
    // on the root of the app go to the figures path
    path: '',
    redirectTo: '/figures',
    pathMatch: 'full'
  },
  {

    // on the figures path get the figures componant
    path: 'figures',
    component: FiguresComponent,
  },
  {
    path: 'newFigure',
    component: NewFigureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myFigures',
    component: MyFiguresComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updateFigure',
    component: UpdateFigureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'collection',
    component: CollectionnerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wish-list',
    component: WishListComponent,
    canActivate: [AuthGuard]
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
    path: 'profil',
    component: ProfilComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
