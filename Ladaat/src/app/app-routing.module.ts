import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DonorsComponent } from './donors/donors.component';
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
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

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
	{ path: 'task', canActivate: [AuthGuard], component: TaskComponent },
	{ path: 'tasks', canActivate: [AuthGuard], component: TasksComponent },
	
	{ path: 'education', canActivate: [AuthGuard], component: EducationComponent },
	{ path: 'new-lecture', canActivate: [AuthGuard], component: NewLectureComponent },
	{ path: 'lecture/:id', canActivate: [AuthGuard], component: LectureComponent },
	{ path: 'task-detail/:id', canActivate: [AuthGuard], component: TaskDetailComponent },
	
	{ path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }