import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DonorsComponent } from './donors/donors/donors.component';
import { DonorComponent } from './donors/donor/donor.component';
import { DonorEditorComponent } from './donors/donor-editor/donor-editor.component';
import { DonationEditorComponent } from './donors/donation-editor/donation-editor.component';
import { AuthGuard } from './login/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { TaskComponent } from './tasks/task/task.component';
import { TasksComponent } from '../app/tasks/tasks.component';
import { DocumentEditorComponent } from './donors/document-editor/document-editor.component';
import { EducationComponent } from './education/education.component';
import { NewLectureComponent } from './education/new-lecture/new-lecture.component';
import { LectureComponent } from "./education/lecture/lecture.component";
import { ConversationEditorComponent } from './donors/conversation-editor/conversation-editor.component';
import { ListingEditorComponent } from "./education/listing-editor/listing-editor.component";
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';
import { TaskEditorComponent } from './tasks/task-editor/task-editor.component';
import { StaffComponent } from "./staff/staff.component";
import { StaffEditorComponent } from "./staff/staff-editor/staff-editor.component";
const routes: Routes = [
	{ path: '', canActivate: [AuthGuard], component: TasksComponent },
	{ path: 'donors', canActivate: [AuthGuard], component: DonorsComponent },
	{ path: 'donor/:id', canActivate: [AuthGuard], component: DonorComponent },
	{ path: 'donation-editor/:donor', canActivate: [AuthGuard], component: DonationEditorComponent },
	{ path: 'donation-editor/:donor/:donation', canActivate: [AuthGuard], component: DonationEditorComponent },
	{ path: 'document-editor/:donor', canActivate: [AuthGuard], component: DocumentEditorComponent },
	{ path: 'document-editor/:donor/:record', canActivate: [AuthGuard], component: DocumentEditorComponent },
	{ path: 'conversation-editor/:donor', canActivate: [AuthGuard], component: ConversationEditorComponent },
	{ path: 'conversation-editor/:donor/:conversation', canActivate: [AuthGuard], component: ConversationEditorComponent },
	{ path: 'donor-editor/:id', canActivate: [AuthGuard], component: DonorEditorComponent },
	{ path: 'donor-editor', canActivate: [AuthGuard], component: DonorEditorComponent },
	{ path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
	// Tasks components :
	{ path: 'task', canActivate: [AuthGuard], component: TaskComponent },
	{ path: 'tasks', canActivate: [AuthGuard], component: TasksComponent },
	{ path: 'task-detail/:id', canActivate: [AuthGuard], component: TaskDetailComponent },
	{ path: 'task-editor/:id', canActivate: [AuthGuard], component: TaskEditorComponent },
	// End tasks components
	{ path: 'education', canActivate: [AuthGuard], component: EducationComponent },
	{ path: 'new-lecture', canActivate: [AuthGuard], component: NewLectureComponent },
	{ path: 'lecture/:id', canActivate: [AuthGuard], component: LectureComponent },
	{ path: 'listing-editor/:id', canActivate: [AuthGuard], component: ListingEditorComponent },
	
	{ path: 'staff', canActivate: [AuthGuard], component: StaffComponent },
	{ path: 'staff-editor', canActivate: [AuthGuard], component: StaffEditorComponent },
	{ path: 'staff/:id', canActivate: [AuthGuard], component: StaffComponent },

	{ path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }