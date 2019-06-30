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
import { TaskService } from './tasks/task.service';
import { DonorsComponent } from './donors/donors/donors.component';
import { DonorComponent } from './donors/donor/donor.component';
import { DonorEditorComponent } from './donors/donor-editor/donor-editor.component';
import { DonationEditorComponent } from './donors/donation-editor/donation-editor.component';
import { ProfileComponent } from './profile/profile.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { DocumentEditorComponent } from './donors/document-editor/document-editor.component';
import { EducationComponent } from './education/education.component';
import { NewLectureComponent } from './education/new-lecture/new-lecture.component';
import { LectureComponent } from './education/lecture/lecture.component';
import { LectureEditorComponent } from './education/lecture-editor/lecture-editor.component';
import { ListingEditorComponent } from './education/listing-editor/listing-editor.component';
import { ConversationEditorComponent } from './donors/conversation-editor/conversation-editor.component';
import { DatePipe } from '@angular/common';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskEditorComponent } from './tasks/task-editor/task-editor.component';
import { StaffComponent } from './staff/staff/staff.component';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './education/listing/listing.component';
import { EventsComponent } from './events/events/events.component';
import { EventEditorComponent } from './events/event-editor/event-editor.component';
import { EventComponent } from './events/event/event.component';
import { MemberEditorComponent } from './staff/member-editor/member-editor.component';
import { MemberComponent } from './staff/member/member.component'
import { RouterModule, ROUTES } from '@angular/router';




@NgModule({
  declarations: [
    AppComponent,
    DonorsComponent,
    HeaderComponent,
    LoginComponent,
    DonorComponent,
    DonorEditorComponent,
    DonationEditorComponent,
    ProfileComponent,
    TasksComponent,
    TaskComponent,
    DocumentEditorComponent,
    EducationComponent,
    NewLectureComponent,
    LectureComponent,
    LectureEditorComponent,
    ListingEditorComponent,
    ConversationEditorComponent,
    TaskDetailComponent,
    TaskEditorComponent,
    StaffComponent,
    ListingComponent,
    EventsComponent,
    EventEditorComponent,
    EventComponent,
    MemberEditorComponent,
    MemberComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    BrowserModule,
    AppRoutingModule,
    FormsModule,
   
    CommonModule,
  ],
  entryComponents: [
   TaskComponent,
  ],
  providers: [TaskService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }