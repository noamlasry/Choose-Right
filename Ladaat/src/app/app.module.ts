import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { TaskService } from './home/task.service';
import { DonorsComponent } from './donors/donors.component';
import { DonorComponent } from './donors/donor/donor.component';
import { DonorEditorComponent } from './donors/donor-editor/donor-editor.component';
import { DonationEditorComponent } from './donors/donation-editor/donation-editor.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { TaskComponent } from './home/task/task.component';
import {MatButtonModule,MatCheckboxModule,MatTableModule,MatDialogModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DonorsComponent,
    HeaderComponent,
    LoginComponent,
    DonorComponent,
    DonorEditorComponent,
    DonationEditorComponent,
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    TaskComponent,
    
 
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  entryComponents: [
   TaskComponent,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
