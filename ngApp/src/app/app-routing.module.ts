import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FiguresComponent } from './figures/figures.component';
import { CollectionnerComponent } from './collectionner/collectionner.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { NewFigureComponent } from './new-figure/new-figure.component';
import { MyFiguresComponent } from './my-figures/my-figures.component';
import { UpdateFigureComponent } from './update-figure/update-figure.component';


import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/figures',
    pathMatch: 'full'
  },
  {
    path: 'figures',
    component: FiguresComponent,
    canActivate: [AuthGuard]
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
    component: ProfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
