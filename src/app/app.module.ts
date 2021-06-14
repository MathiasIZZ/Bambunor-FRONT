import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SocialLoginModule, GoogleLoginProvider, SocialAuthServiceConfig, SocialAuthService} from 'angularx-social-login';
import { IntroComponent } from './components/intro/intro.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import {NgxParallaxScrollModule} from 'ngx-parallax-scroll';
import { ContactComponent } from './components/contact/contact.component';
import { CueilletteComponent } from './components/cueillette/cueillette.component';
import { HistoireComponent } from './components/histoire/histoire.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



const googleLoginOptions = {
  scope: 'profile email'
};

/*
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1021940320321-iql2p0icai5nv9qbviou0i61b6e1u6qf.apps.googleusercontent.com", googleLoginOptions)
  },
]);

export function providerConfig() {
  return config;
}
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CheckoutComponent,
    ThankyouComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    LoginComponent,
    ProfileComponent,
    IntroComponent,
    PresentationComponent,
    ContactComponent,
    CueilletteComponent,
    HistoireComponent,
    NewsletterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    NgxParallaxScrollModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1021940320321-iql2p0icai5nv9qbviou0i61b6e1u6qf.apps.googleusercontent.com'
            )
          },
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




