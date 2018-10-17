import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FiguresComponent } from './figures/figures.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { FiguresService } from './figures.service';
import { CollectionnerComponent } from './collectionner/collectionner.component';
import { ProfilComponent } from './profil/profil.component';
import { NewFigureComponent } from './new-figure/new-figure.component';
import { UpdateFigureComponent } from './update-figure/update-figure.component';
import { MyFiguresComponent } from './my-figures/my-figures.component';
import { WishListComponent } from './wish-list/wish-list.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FiguresComponent,
    CollectionnerComponent,
    ProfilComponent,
    NewFigureComponent,
    UpdateFigureComponent,
    MyFiguresComponent,
    WishListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, AuthGuard, FiguresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
