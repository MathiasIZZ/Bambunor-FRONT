import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ProductComponent} from './components/product/product.component';
import {ThankyouComponent} from './components/thankyou/thankyou.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfilGuard} from './guard/profil.guard';
import {IntroComponent} from './components/intro/intro.component';
import {PresentationComponent} from './components/presentation/presentation.component';
import {ContactComponent} from './components/contact/contact.component';
import {CeuilletteComponent} from './components/ceuillette/ceuillette.component';

const routes: Routes = [
  {
    path: '', component: IntroComponent
  },
  {
    path: 'cueillette', component: CeuilletteComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
  {
    path: 'presentation', component: PresentationComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'thankyou', component: ThankyouComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate:[ProfilGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
