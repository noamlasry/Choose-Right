import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DonorsComponent } from './donors/donors.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DonorComponent } from './donor/donor.component';
import { DonorEditorComponent } from './donor-editor/donor-editor.component';
import { DonationComponent } from './donation/donation.component';

@NgModule({
  declarations: [
    AppComponent,
    DonorsComponent,
    HeaderComponent,
    LoginComponent,
    DonorComponent,
    DonorEditorComponent,
    DonationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
